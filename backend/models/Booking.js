import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    listingId: {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
        required: true,
    },
    checkin: {
        type: Date,
        required: true,
    },
    checkout: {
        type: Date,
        required: true,
    },
    numberOfGuests: {
        type: Number,
        default: 1,
    },
    razorpayPaymentId: {
        type: String,
    },
    razorpayOrderId : {
        type : String,
    },
    razorpaySignature : {
        type : String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Cancelled'],
        default: 'Pending',
    },
});

const Booking = model('Booking', bookingSchema)
export default Booking

