require('dotenv').config(); 
//express - connect to server using express
const express = require('express');
const app = express();
const port = process.env.PORT;
app.listen(port, () => console.log(`app is listening to port ${port}`));

//mongoose - connect to database using mongoose
const mongoose = require('mongoose')
const MONGOOSE_URL = process.env.ATLAS_URL;
async function main() {
    await mongoose.connect(MONGOOSE_URL)
}
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

//model
const Listings = require('./models/listing.js');

app.get("/", async (req, res) => {
    let info = await Listings.findById('685d3e67624942d053fc13dd')
    console.log(info);
    res.send("hello world")
})

app.get("/api/listings", async (req, res) => {
    let listings = await Listings.find({});
    res.json(listings)
})