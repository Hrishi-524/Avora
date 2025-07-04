import 'dotenv/config'

//express - connect to server using express
import express from 'express';
const app = express();
const port = process.env.PORT;
app.listen(port, () => console.log(`app is listening to port ${port}`));

//mongoose - connect to database using mongoose
import mongoose from 'mongoose';
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
import Listings from './models/Listing.js'
import Review from './models/Review.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get("/", async (req, res) => {
    let info = await Listings.findById('685d3e67624942d053fc13dd')
    console.log(info);
    res.send("hello world")
})

app.get("/api/listings", async (req, res) => {
    try {
        let listings = await Listings.find({});
        res.json(listings)
    } catch (error) {
        console.log(error);
        throw error;
    }
})

app.get("/api/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listings.findById(id);
    let listen = await listing.populate("reviews");
    console.log("console log at app.js /api/listings/:id")
    res.json(listen)
})

app.post("/api/listings/:id/reviews", async (req, res) => {
    let { id } = req.params;
    let {comment , rating} = req.body;

    let listing = await Listings.findById(id);
    let newReview = new Review({
        comment : comment,
        rating : rating,
        createdAt: Date.now(),
    })
    listing.reviews.push(newReview._id)

    console.log("Review succesfully submitted")
    console.log(listing.reviews);

    await newReview.save();
    await listing.save();

    let populatedListing = await Listings.findById(id).populate("reviews");
    let latestReview = populatedListing.reviews[populatedListing.reviews.length - 1];
    console.log("latest review")
    console.log(latestReview)

    res.json(latestReview);
})