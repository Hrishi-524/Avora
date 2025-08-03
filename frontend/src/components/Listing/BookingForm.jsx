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

function BookingForm({listing}) {
    const navigate = useNavigate();
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [guests, setGuests] = useState(1);
    const [error, setError] = useState('');

    const submitBookingForm = async (e) => {
        e.preventDefault();
        try {
            if (!checkIn || !checkOut) {
                setError('Please select both Check-In and Check-Out dates.');
                return;
            }
            const bookingDetails = {
                checkIn: checkIn?.toISOString(),
                checkOut: checkOut?.toISOString(),
                numberOfGuests: guests || 1,  // fallback to 1 if empty
                listingId: listing._id,
                price: listing.price,
            };

            const response = await inititateBooking(bookingDetails)
        } catch (error) {
            console.error('Booking error:', error);
            setError(error.response?.data?.error || 'Booking failed. Please try again.');
        }
    }
    return (
        <div className="booking">
            <div className="booking-price">
                <span className="price">₹{listing.price}</span>
                <span className="period">per night</span>
            </div>
            {/* Form for Booking (checkin date, checkout date, number of guests) */}
            <form onSubmit={submitBookingForm}>
                <label htmlFor="CheckIn">Check In</label>
                <br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label='CheckIn'
                        value={checkIn}
                        onChange={(newValue) => setCheckIn(newValue)}
                        slotProps={{
                            layout: {
                            sx: {
                                color: 'hsl(148, 42%, 40%)',
                                borderRadius: '10px',
                                borderWidth: '5px',
                                borderColor: 'hsl(0 0% 96%)',
                                border: '3px solid',
                                backgroundColor: 'hsl(0 0% 96%)',
                            }
                            }
                        }}
                         
                    />
                </LocalizationProvider>
                <br />
                <label htmlFor="CheckOut">Check Out</label>
                <br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label='CheckOut' 
                        value={checkOut}
                        onChange={(newValue) => setCheckOut(newValue)}
                        slotProps={{
                            layout: {
                            sx: {
                                color: 'hsl(148, 42%, 40%)',
                                borderRadius: '10px',
                                borderWidth: '5px',
                                borderColor: 'hsl(0 0% 96%)',
                                border: '3px solid',
                                backgroundColor: 'hsl(0 0% 96%)',
                            }
                            }
                        }}
                    />
                </LocalizationProvider>
                <br />
                <label htmlFor="numberOfGuests">How Many?</label>
                <br />
                <input name="numberOfGuests" type="number" value={guests} onChange={(e) => setNumberOfGuests(e.target.value)} />
                <button className="booking-button" type="submit">
                    Reserve Now
                </button>
            </form>
        </div>
    )
}

export default BookingForm