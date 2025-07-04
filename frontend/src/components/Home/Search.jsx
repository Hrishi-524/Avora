import './Search.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState, useEffect, useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export default function Search() {
    const [activeField, setActiveField] = useState(null);
    const containerRef = useRef();

    const [searchInfo, setSearchInfo] = useState({
        destination: '',
        checkIn: null,
        checkOut: null,
        guests: 0,
    });

    function handleClickOutside(event) {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setActiveField(null);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDateChange = (newValue) => {
        if (activeField === 'checkIn') {
            setSearchInfo((prev) => ({ ...prev, checkIn: newValue }));
        } else if (activeField === 'checkOut') {
            setSearchInfo((prev) => ({ ...prev, checkOut: newValue }));
        }
    };

    return (
        <div className="dropdown" ref={containerRef}>
            <div className={`search-bar ${activeField ? 'active' : ''}`}>
                {/* Destination */}
                <div
                    className={`input-search bar-component ${activeField === 'destination' ? 'active' : ''}`}
                    onClick={() => setActiveField('destination')}
                >
                    <h5>Where to?</h5>
                    <input
                        placeholder="destination"
                        value={searchInfo.destination}
                        onChange={(e) =>
                            setSearchInfo((prev) => ({ ...prev, destination: e.target.value }))
                        }
                        style={{
                            all: 'unset',
                            fontSize: '1rem',
                            fontFamily: 'var(--ff)',
                            cursor: 'text',
                        }}
                    />
                </div>

                {/* Check-In */}
                <div
                    className={`check-in bar-component ${activeField === 'checkIn' ? 'active' : ''}`}
                    onClick={() => setActiveField('checkIn')}
                >
                    <h5>Check in</h5>
                    <p className="small-text" style={{ color: 'var(--text-muted)' }}>
                        {searchInfo.checkIn
                            ? searchInfo.checkIn.format('DD/MM/YYYY')
                            : 'Add dates'}
                    </p>
                </div>

                {/* Check-Out */}
                <div
                    className={`check-out bar-component ${activeField === 'checkOut' ? 'active' : ''}`}
                    onClick={() => setActiveField('checkOut')}
                >
                    <h5>Check out</h5>
                    <p className="small-text" style={{ color: 'var(--text-muted)' }}>
                        {searchInfo.checkOut
                            ? searchInfo.checkOut.format('DD/MM/YYYY')
                            : 'Add dates'}
                    </p>
                </div>

                {/* Guests & Search */}
                <div
                    className={`count bar-component ${activeField === 'guests' ? 'active' : ''}`}
                    onClick={() => setActiveField('guests')}
                >
                    <div className={`who ${activeField === 'guests' ? 'active' : ''}`}>
                        <h5>Who?</h5>
                        <input
                            type="number"
                            min="0"
                            value={searchInfo.guests === 0 ? '' : searchInfo.guests}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setSearchInfo((prev) => ({
                                ...prev,
                                guests: isNaN(value) || value < 0 ? 0 : value,
                                }));
                            }}
                            placeholder="Add guests"
                            style={{
                                all: 'unset',
                                fontSize: '1rem',
                                fontFamily: 'var(--ff)',
                                cursor: 'text',
                                color: searchInfo.guests === 0 ? 'var(--text-muted)' : 'initial',
                                width: '7rem',
                            }}
                        />
                    </div>
                    <div className={`search-icon bar-component`}>
                        <SearchOutlinedIcon sx={{ color: 'white' }} />
                    </div>
                </div>
            </div>
            {(activeField === 'checkIn' || activeField === 'checkOut') && (
                <div className="calendar-wrapper">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                        value={activeField === 'checkIn' ? searchInfo.checkIn : searchInfo.checkOut}
                        onChange={handleDateChange}
                        sx={{
                            backgroundColor: 'var(--bg-light)',
                            borderRadius: '1rem',
                            border: '2px solid black',
                            zIndex: '999',
                            marginLeft: activeField === 'checkIn' ? '9rem' : '19rem',
                            height: '19rem',
                        }}
                        />
                    </LocalizationProvider>
                </div>
            )}
        </div>
    );
}
