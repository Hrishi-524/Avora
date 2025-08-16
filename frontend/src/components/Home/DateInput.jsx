import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from 'react';

function DateInput({text}) {
    const datePickerRef = useRef(null);
    return (
        <div 
            className="input-search"
            onClick={() => datePickerRef.current.setOpen(true)}
        >
            <h5>Check In</h5>
            <DatePicker 
                ref={datePickerRef}
                onChange={(date) => setStartDate(date)} 
                className='react-datepicker-component'
                placeholderText={`${text}`}
            />
        </div> 
    )
}

export default DateInput