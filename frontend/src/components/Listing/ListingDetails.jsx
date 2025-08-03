import './ListingDetails.css'
import Avatar from '@mui/material/Avatar';

export default function ListingDetails({listing}) {
    return(
        <div className="listing-details">
            <div className="left-content">
                <div className="host-profile">
                    <Avatar alt={listing.host.username} src={listing.host.profileImage} sx={{ width: 46, height: 46 }}/>
                    <div className="host-info">
                        <h5>Hosted by {listing.host.username}</h5>
                        <p>
                            <span>Host since {new Date(listing.host.createdAt).getFullYear() || 'recently'}</span>
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
                </div>
            </div>
        </div>
    )
}
