    import React from 'react'
    import './BookingForm.css'
    //date picker components from MUI
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
    import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
    import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
    //useState
    import { useState } from 'react';
    //booking axios
    import { inititateBooking } from '../../api/booking';
    import { useNavigate, Link }from 'react-router-dom'
import { getUserInfo } from '../../utils/auth';

    function BookingForm({listing}) {
        const navigate = useNavigate();
        const [checkIn, setCheckIn] = useState(null);
        const [checkOut, setCheckOut] = useState(null);
        const [guests, setGuests] = useState(1);
        const[IsLoading,setIsLoading] = useState(false)
        const [error, setError] = useState('');

        const today = new Date().toISOString().split('T')[0];

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        const calculateNights = () => {
            if (checkIn && checkOut) {
                const startDate = new Date(checkIn);
                const endDate = new Date(checkOut);
                const timeDiff = endDate.getTime() - startDate.getTime();
                const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return nights > 0 ? nights : 0;
            }
            return 0;
        };

        const calculateTotal = () => {
            const nights = calculateNights();
            return nights * listing.price;
        };

        const handleCheckInChange = (e) => {
            const selectedDate = e.target.value;
            setCheckIn(selectedDate);
            
            // If checkout is before or same as new checkin, clear checkout
            if (checkOut && new Date(checkOut) <= new Date(selectedDate)) {
                setCheckOut('');
            }
        };

        const handleCheckOutChange = (e) => {
            setCheckOut(e.target.value);
        };

        const getMinCheckOutDate = () => {
            if (checkIn) {
                const nextDay = new Date(checkIn);
                nextDay.setDate(nextDay.getDate() + 1);
                return nextDay.toISOString().split('T')[0];
            }
            return tomorrowStr;
        };

    const submitBookingForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (!checkIn || !checkOut) {
                setError('Please select both Check-In and Check-Out dates.');
                setIsLoading(false);
                return;
            }

            if (new Date(checkOut) <= new Date(checkIn)) {
                setError('Check-Out date must be after Check-In date.');
                setIsLoading(false);
                return;
            }

            const bookingDetails = {
                checkIn: new Date(checkIn)?.toISOString(),
                checkOut: new Date(checkOut)?.toISOString(),
                numberOfGuests: guests || 1,
                listingId: listing._id,
                price: listing.price,
            };

            // Step 1: Call backend to create order
            const response = await inititateBooking(bookingDetails);
            console.log(response)
            const { orderId, amount, key, receiptId } = response.data;
            console.log(`0000000000000000000000${response.data.amount}`)

            // Step 2: Open Razorpay Checkout
            const options = {
                key,
                amount,
                currency: "INR",
                name: "Wanderlust",
                description: `Booking for ${listing.title}`,
                order_id: orderId,
                handler: async function (razorpayResponse) {
                    // Step 3: Verify payment with backend
                    try {
                        const verifyRes = await fetch("/api/payment/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                ...razorpayResponse,  // contains razorpay_order_id, razorpay_payment_id, razorpay_signature
                                checkIn: bookingDetails.checkIn,
                                checkOut: bookingDetails.checkOut,
                                guestCount: bookingDetails.numberOfGuests,
                                listingId: listing._id,
                                userId: getUserInfo().id, // replace with logged in user id
                            }),
                        });

                        const data = await verifyRes.json();
                        if (data.success) {
                            alert("Booking confirmed ✅");
                            navigate(`/listings /${listing._id}`);
                        } else {
                            alert("Payment verification failed ❌");
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        alert("Error verifying payment");
                    }
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error('Booking error:', error);
            setError(error.response?.data?.error || 'Booking failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


        const nights = calculateNights();
        const total = calculateTotal();

        return (
            <div className="booking">
                <div className="booking-price">
                    <span className="price">₹{listing.price}</span>
                    <span className="period">per night</span>
                </div>
                {/* Form for Booking (checkin date, checkout date, number of guests) */}
                <form onSubmit={submitBookingForm}>
                    <label style={{
                        fontFamily: 'var(--ff)',
                        display: 'block',
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: '0.5rem'
                    }}>
                        Check In
                    </label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={handleCheckInChange}
                        min={today}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            fontSize: '1rem',
                            border: '2px solid #ccc',
                            borderRadius: '8px',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                        onBlur={(e) => e.target.style.borderColor = '#ccc'}
                        required
                    />
                    <br />
                    <br />
                    <label style={{
                        fontFamily: 'var(--ff)',
                        display: 'block',
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: '0.5rem'
                    }}>
                        Check Out
                    </label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={handleCheckOutChange}
                        min={getMinCheckOutDate()}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            fontSize: '1rem',
                            border: '2px solid #ccc',
                            borderRadius: '8px',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                        onBlur={(e) => e.target.style.borderColor = '#ccc'}
                    />
                    <br />
                    <br />
                    <label 
                    htmlFor="numberOfGuests"
                    style={{
                        fontFamily: 'var(--ff)',
                        display: 'block',
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: '0.5rem'
                    }
                    }>
                        How Many?
                    </label>
                    <input name="numberOfGuests" type="number" value={guests} onChange={(e) => setNumberOfGuests(e.target.value)} />
                    <br />
                    <br />
                    {/* Booking Summary */}
                    {nights > 0 && (
                        <div style={{
                            fontFamily: 'var(--ff)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            padding: '1rem',
                            background: 'var(--bg-dark)',
                            borderRadius: '8px',
                            marginTop: '1rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '0.9rem',
                                color: '#666'
                            }}>
                                <span>₹{listing.price} × {nights} nights</span>
                                <span>₹{total}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                color: '#333',
                                borderTop: '1px solid #e9ecef',
                                paddingTop: '0.5rem',
                                marginTop: '0.5rem'
                            }}>
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>
                    )}
                    <button className="booking-button" type="submit">
                        Reserve Now
                    </button>
                    <p style={{
                        fontSize: '0.8rem',
                        color: '#666',
                        textAlign: 'center',
                        marginTop: '1rem',
                        margin: '1rem 0 0 0'
                    }}>
                        You won't be charged yet
                    </p>
                </form>
            </div>
        )
    }

    export default BookingForm