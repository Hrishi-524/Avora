import axios from "axios";
import { getUserInfo } from "../utils/auth";


export const inititateBooking = async (bookingDetails) => {
    //POST : /api/listings/${listing._id}/book
    try {
        const response = await axios.post(`/api/listings/${bookingDetails.listingId}/book`, bookingDetails)
        const order = response.data;
        const user = getUserInfo()
        const options = {
            "key": order.key, 
            "amount": bookingDetails.price,  
            "currency": "INR",
            "name": "Wanderlust co. ltd.", 
            "description": "Dummy Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.orderId, 
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": {
                name: user?.name || "",
                email: user?.email || "",
                contact: user?.contact || ""
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            },
            "handler": async function (response) {
                try {
                    const verification = await axios.post("/api/payment/verify", response);
                    if (verification.data.success) {
                        navigate("/payment-success", { state: response });
                    } else {
                        alert("Payment verification failed.");
                    }
                } catch (err) {
                    console.error("Verification error:", err);
                    alert("Payment verification failed. Try again.");
                }
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    } catch (error) {
        console.error("Booking Error: ", err.response?.data?.message || err.message);
        alert(err.response?.data?.message || "Booking failed. Try again.");
    }
}