import './Search.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Datecalender from './Datecalender';
import { useState, useEffect, useRef } from 'react';

export default function Search() {
    const [activeIndex, setActiveIndex] = useState(null);
    const containerRef = useRef();

    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveIndex(null); // remove highlight if clicked outside
      }
    }
    
    useEffect(() => {
        //mousedown is like click , click = mousedown + mouseup so mousedown is little faster
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function openDatepicker() {
        return <Datecalender />
    }
    return (
        <div className={`search-bar ${activeIndex !== null ? 'active' : ''}` }ref={containerRef}>
            <div className={`input-search bar-component ${activeIndex === 0 ? 'active' : ''}`}
            onClick={() => setActiveIndex(0)}>
                <h5>Where to?</h5>
                <input placeholder="destination"
                    style={{
                        all: 'unset',
                        fontSize: '1rem',
                        fontFamily: 'var(--ff)',
                        cursor:'text'
                    }}
                />
            </div>
            <div className={`check-in bar-component ${activeIndex === 1 ? 'active' : ''}`}
            onClick={() => setActiveIndex(1)}>
                <h5>Check in</h5>
                <p className='small-text' style={{color: 'var(--text-muted)'}}>Add dates</p>
            </div>
            <div className={`check-out bar-component ${activeIndex === 2 ? 'active' : ''}`}
            onClick={() => setActiveIndex(2)}>
                <h5>Check out</h5>
                <p className="small-text" style={{color: 'var(--text-muted)'}}>Add dates</p>
            </div>

            <div className={`count bar-component ${activeIndex === 3 ? 'active' : ''}`}
            onClick={() => setActiveIndex(3)}>
                <div className={`who ${activeIndex === 5 ? 'active' : ''}`}>
                    <h5>Who?</h5>
                    <p className="small-text" style={{color: 'var(--text-muted)'}}>Add guests</p>
                </div>
                <div className={`search-icon bar-component ${activeIndex === 4 ? 'active' : ''}`}>
                    <SearchOutlinedIcon sx={{color: 'white'}}/>
                </div >
            </div>

        </div>
    )
}