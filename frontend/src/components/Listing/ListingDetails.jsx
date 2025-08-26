import './listingDetails.css'
import Avatar from '@mui/material/Avatar';
import BookingForm from './BookingForm.jsx';

export default function ListingDetails({listing}) {
    return(
        <div className="listing-details">
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
            <BookingForm listing={listing} />
        </div>
    )
}
