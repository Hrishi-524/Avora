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

// Add CORS headers
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

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