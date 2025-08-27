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


import cors from 'cors';

// Allow all origins
app.use(cors({
    origin: true,
    credentials: true
}));

// Or be more specific but flexible
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        // Allow all origins for now
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import listingRouter from './routes/listing.js';
import reviewRouter from './routes/review.js';
import userRouter from './routes/user.js';
import bookingRouter from './routes/booking.js'
import paymentRouter from './routes/payment.js'

app.use("/api", userRouter);

app.use("/api/listings", listingRouter);

app.use("/api/listings/:id/reviews", reviewRouter);

app.use("/api/listings/:id/book", bookingRouter);

app.use("/api/payment", paymentRouter);

import ExpressError from './errorhandling/ExpressError.js';
import NotFound from './errorhandling/NotFound.js';

// app.all('/*', (req, res, next) => {
//     next(new NotFound("Page Not Found"));
// });

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).json({ 
        success: false,
        error: {
        status,
        message,
        },
    });
});