import Razorpay from 'razorpay'

export const initiateBooking = async (req, res) => {
    const {checkIn, checkOut, numberOfGuests, listingId, price} = req.body;
    console.log(price)
    try {
        const instance = new Razorpay({ 
            key_id: process.env.RAZORPAY_KEY_ID, 
            key_secret: process.env.RAZORPAY_KEY_SECRET 
        })

        console.log("---------------checkpint--------------------")
        const order = await instance.orders.create({
            amount: price * 100,
            currency: "INR",
            receipt: `recipt_${Date.now()}`,
        })

        res.status(201).json({
            success : true,
            orderId : order.id,
            amount : order.amount,
            key : process.env.RAZORPAY_KEY_ID,
            receiptId : order.receipt,
        })
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        const message = error?.error?.description || "Failed to initiate payment";

        res.status(500).json({
            success: false,
            message: message,
        });
    }
}

// sample suucess response 
//order = {
    // "id": "order_IluGWxBm9U8zJ8",
    // "entity": "order",
    // "amount": 50000,
    // "amount_paid": 0,
    // "amount_due": 50000,
    // "currency": "INR",
    // "receipt": "rcptid_11",
    // "offer_id": null,
    // "status": "created",
    // "attempts": 0,
    // "notes": [],
    // "created_at": 1642662092
//}

//sample faliure response
//order = {
    // "error": {
    //     "code": "BAD_REQUEST_ERROR",
    //     "description": "Order amount less than minimum amount allowed",
    //     "source": "business",
    //     "step": "payment_initiation",
    //     "reason": "input_validation_failed",
    //     "metadata": {},
    //     "field": "amount"
    // }
//}

     