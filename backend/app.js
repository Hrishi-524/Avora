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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import listingRouter from './routes/listing.js';
import reviewRouter from './routes/review.js';
import userRouter from './routes/user.js';

app.use("/api", userRouter);

app.use("/api/listings", listingRouter);

app.use("/api/listings/:id/reviews", reviewRouter);
