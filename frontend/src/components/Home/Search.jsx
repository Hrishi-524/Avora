import './Search.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState, useEffect, useRef, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sendSearchInfo } from '../../api/listings.js';

function Search({onSearchComplete}) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [searchInfo, setSearchInfo] = useState({
        destination: '',
        checkIn: null,
        checkOut: null,
        guests: 0,
    });
    
    const refs = useRef({
        input: null,
        datePickerIn: null,
        datePickerOut: null,
        num: null,
    });

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest('.input-search-last')) {
                setIsExpanded(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    

    const submitSearch = async (e) => {
        e.preventDefault()
        try {
            if (!searchInfo.destination.trim()) {
                throw new Error('Please enter a destination');
            }
        
            if (!startDate || !endDate) {
                throw new Error('Please select check-in and check-out dates');
            }
        
            const searchData = {
                location: searchInfo.destination.trim(),
                checkIn: startDate.toISOString().split('T')[0],
                checkOut: endDate.toISOString().split('T')[0],
                guests: parseInt(refs.current.num?.value) || 1,
            };

            const response = await sendSearchInfo(searchData);
            console.log('Search response : ',response)

            if (onSearchComplete) {
                onSearchComplete(response);
            }
        } catch (error) {
            setSearchError(error.message);
            console.error('Search error:', error);
        }
    }
    
    return (
        // SEARCH FORM 
        <form onSubmit={(e) => submitSearch(e)} className="search-form">
            {/* DESTINATION */}
            <div 
                className="input-search" 
                onClick={() => refs.current.input?.focus()}
            >
                <h5>Where to?</h5>
                <input 
                    ref={(el) => refs.current.input = el}
                    type='text' 
                    name='destination' 
                    className='destination' 
                    placeholder='destination'
                    value={searchInfo.destination}
                    onChange={(e) => setSearchInfo(prev => ({
                        ...prev, 
                        destination: e.target.value
                    }))}
                />
            </div>
           <div 
                className="input-search"
                onClick={() => refs.current.datePickerIn?.setOpen(true)}
            >
                <h5>Check In</h5>
                <DatePicker 
                    name='checkin'
                    selected={startDate}
                    ref={(el) => refs.current.datePickerIn = el}
                    minDate={new Date()}
                    shouldCloseOnSelect={true}
                    onChange={(date) => {
                        setStartDate(date);
                        // Auto-focus next DatePicker
                        setTimeout(() => {
                            refs.current.datePickerOut?.setOpen(true);
                        }, 100);
                    }}
                    className='react-datepicker-component'
                    placeholderText='Check In'
                />
            </div> 
            <div 
                className="input-search"
                onClick={() => refs.current.datePickerOut?.setOpen(true)}
            >
                <h5>Check Out</h5>
                <DatePicker 
                    name='checkout'
                    selected={endDate}
                    shouldCloseOnSelect={true}
                    ref={(el) => refs.current.datePickerOut = el}  
                    minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : new Date()}
                    onChange={(date) => {
                        setEndDate(date)
                        setTimeout(() => {
                            refs.current.num?.focus();
                        }, 100);
                    }} 
                    className='react-datepicker-component'
                    placeholderText='Check Out'
                />
            </div>
            <div 
                className={`input-search-last ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setIsExpanded(true)}
            >
                <div 
                    className="left-counterpart"
                    onClick={() => refs.current.num?.focus()}
                >
                    <h5>How Many?</h5>
                    <input 
                        ref={(el) => refs.current.num = el}
                        type="number" 
                        name="guestCount" 
                        className='number-in' 
                        placeholder='Guest'
                        style={{
                            all:'unset',
                            fontFamily:'var(--ff)',
                            fontSize:'0.9rem',
                            width:'50%',
                        }}
                    />
                </div>
                <div className="right-counterpart">
                    <button type="submit" style={{all:'unset', display:'flex', flexDirection:'row'}}>
                        <SearchOutlinedIcon/>
                        <p style={{fontFamily:'var(--ff)'}}>search</p>
                    </button>
                </div>
            </div>  
            {searchError && (
                <div style={{
                    color: 'red',
                    fontSize: '0.9rem',
                    marginTop: '0.5rem',
                    textAlign: 'center'
                }}>
                    {searchError}
                </div>
            )}
        </form>
    )
}

export default Search