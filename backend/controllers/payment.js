import crypto from "crypto";
import Booking from "../models/Booking.js";

export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, checkIn, checkOut, guestCount, listingId, userId } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");
    console.log(`POST/VERIFY PAYEMENT`)
    if (generated_signature === razorpay_signature) {
        const newBooking = new Booking({
            user: userId,
            listing : listingId,
            checkIn: checkIn,  
            checkOut: checkOut,
            numberOfGuests: guestCount, 
            razorpayPaymentId: razorpay_payment_id,
            razorpayOrderId : razorpay_order_id,
            razorpaySignature : razorpay_signature,
            status: "Paid",
        });


        await newBooking.save();
        return res.status(200).json({ success: true, message: "Payment verified and booking confirmed" });
    } else {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }
};
