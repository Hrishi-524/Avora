// src/pages/PaymentSuccess.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="payment-container">
                <h2 className="error-text">No payment details found!</h2>
                <button className="home-button" onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        );
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = state;

    return (
        <div className="payment-container">
            <h1 className="success-text">Payment Successful!</h1>
            <div className="payment-details">
                <p><strong>Payment ID:</strong> {razorpay_payment_id}</p>
                <p><strong>Order ID:</strong> {razorpay_order_id}</p>
                <p><strong>Signature:</strong> {razorpay_signature}</p>
            </div>
            <button className="home-button" onClick={() => navigate("/")}>
                Go to Home
            </button>
        </div>
    );
};

export default PaymentSuccess;
