const mongoose = require('mongoose');
const MONGOOSE_URL = 'mongodb+srv://Hrishi:DV71lKee1mOmF9ZF@cluster0.t1iub2a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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

const initData = require('./data.js');
const Listing = require('../models/listing.js');

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("old data deleted");
    await Listing.insertMany(initData.data);
    console.log("initialized database");
}

initDB();

