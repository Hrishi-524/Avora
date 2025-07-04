import { connect } from 'mongoose';
const MONGOOSE_URL = 'mongodb+srv://Hrishi:DV71lKee1mOmF9ZF@cluster0.t1iub2a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

async function main() {
    await connect(MONGOOSE_URL)
}

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

import { data } from './data.js';
import Listing  from '../models/Listing.js';
import Review from '../models/Review.js';

const initDB = async () => {
    await Listing.deleteMany({});
    await Review.deleteMany({}); // 🧼 Clean reviews too
    console.log("old data deleted");
    await Listing.insertMany(data);
    console.log("initialized database");
}

initDB();

