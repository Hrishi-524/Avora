import './ListingDetails.css'
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';

export default function ListingDetails({listing}) {
    return(
        <div className="listing-details">
            <div className="left-content">
                <div className="host-profile">
                    <Avatar alt={listing.host.username} src={listing.host.profileImage} sx={{ width: 56, height: 56 }}/>
                    <div className="host-info">
                        <h4>Hosted by {listing.host.username}</h4>
                        <p>
                            <span>Super Host</span>
                            <span className="host-rating">★ {listing.hostRating ? listing.hostRating.toFixed(1) : 'N/A'}</span>
                            <span>• {listing.host.totalReviews || 0} reviews</span>
                        </p>
                    </div>
                </div>
                
                <div className="listing-description">
                    <p>{listing.description}</p>
                </div>
            </div>
            
            <div className="right-content">
                <div className="booking">
                    <div className="booking-price">
                        <span className="price">₹{listing.price}</span>
                        <span className="period">per night</span>
                    </div>
                    
                    <button className="booking-button">
                        Reserve Now
                    </button>
                    
                    <div className="booking-info">
                        <div className="booking-info-item">
                            <span>₹{listing.price} × 1 night</span>
                            <span>₹{listing.price}</span>
                        </div>
                        <div className="booking-info-item">
                            <span>Service fee</span>
                            <span>₹{Math.round(listing.price * 0.1)}</span>
                        </div>
                        <div className="booking-info-item">
                            <span>Taxes</span>
                            <span>₹{Math.round(listing.price * 0.12)}</span>
                        </div>
                        <div className="booking-info-item total">
                            <span>Total</span>
                            <span>₹{Math.round(listing.price * 1.22)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
