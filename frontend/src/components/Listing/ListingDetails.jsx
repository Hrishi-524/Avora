import './ListingDetails.css'
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';

export default function ListingDetails({listing}) {
    return(
        <div className="listing-details">
            <h5>Hosted by host</h5>
            <div className="host-profile">
                <Avatar sx={{ bgcolor: deepOrange[500] }}>H</Avatar>
                <div className="host-highlight">
                    <h5>Host</h5>
                    <p>rating 4.5, hosted 10+ locations, 10 years of experience</p>
                </div>
            </div>
            <div className="listing-description">
                <p>{listing.description}</p>
            </div>
            <div className="booking">
                <p>{`₹${listing.price} for one night`}</p>
                <Button variant="contained" color="success">Booking Here</Button>
            </div>
        </div>
    )
}