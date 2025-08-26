import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../api/user";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Face6Icon from "@mui/icons-material/Face6";
import "./Profile.css";
import { fetchHostListings, fetchUserBookings } from "../api/booking";
import '../components/Home/Card.jsx'
import Card from "../components/Home/Card.jsx";
import { destroyListing } from "../api/listings.js";
import { getUserInfo } from "../utils/auth.js";

import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/joy/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import './Card.css'
import { NavLink, Link } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState({});
    const [editProfileMode, setEditProfileMode] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const navigate = useNavigate()

useEffect(() => {
    const loadUserData = async () => {
        try {
        setLoading(true);
        setError(null);
        
        const userData = await fetchUserProfile(params.id);
        setUser(userData.data.userDetails);
        
        const fetchedBookings = await fetchUserBookings(params.id);
        setBookings(fetchedBookings);

        // Fetch listings if user is a host
        if (userData.data.userDetails.isHost) {
            const hostListings = await fetchHostListings(params.id);
            setListings(hostListings);
        }
        } catch (error) {
        console.error("Error loading user data:", error);
        setError("Failed to load user profile");
        } finally {
        setLoading(false);
        }
    };

    if (params.id) {
        loadUserData();
    }
}, [params.id]);

const updateUserDetails = (e) => {
    e.preventDefault();
    const updatedUser = {
        username: user.username,
        email: user.email,
        bio: user.bio,
        personalContact: user.personalContact,
        profileImage: user.profileImage,
    };
    console.log("Updated user object (send to backend):", updatedUser);
};

const editListing = (listingId) => {
    console.log("Edit listing:", listingId);
    const userId = getUserInfo().id
    navigate(`/user/${userId}/listings/edit/${listingId}`);
};

const deleteListing = async (listingId) => {
    console.log("Delete listing:", listingId);
    if (confirm("Are you sure you want to delete this listing?")) {
        const res = await destroyListing(listingId)
        setListings(prev => prev.filter(listing => listing._id !== listingId));
    }
};

const toggleEditMode = () => setEditProfileMode((prev) => !prev);

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'confirmed':
        return '#28a745';
        case 'pending':
        return '#ffc107';
        case 'cancelled':
        return '#dc3545';
        default:
        return '#6c757d';
    }
};

if (loading) {
    return <div className="profile-container">Loading...</div>;
}

if (error) {
    return <div className="profile-container">Error: {error}</div>;
}

return (
    <div className="profile-container">
      {/* USER HEADER */}
      <div className="profile-header">
        <Avatar
          alt={user.username}
          src={user?.profileImage}
          sx={{
            width: "8rem",
            height: "8rem",
            bgcolor: "var(--primary)",
          }}
        >
          {!user.profileImage && <Face6Icon sx={{ fontSize: "4rem" }} />}
        </Avatar>

        <div className="profile-info">
          <h1>{user.username}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-bio">{user.bio || "No bio yet."}</p>
          <button className="edit-btn" onClick={toggleEditMode}>
            {editProfileMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* EDIT MODE */}
      {editProfileMode && (
        <form className="edit-form" onSubmit={updateUserDetails}>
          <label>
            Username:
            <input
              type="text"
              value={user.username || ""}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={user.email || ""}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>
          <label>
            Bio:
            <textarea
              value={user.bio || ""}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />
          </label>
          <label>
            Contact:
            <input
              type="text"
              value={user.personalContact || ""}
              onChange={(e) =>
                setUser({ ...user, personalContact: e.target.value })
              }
            />
          </label>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </form>
      )}

      {/* BOOKINGS SECTION */}
      <div className="bookings-section">
        <h2>My Bookings ({bookings.length})</h2>
        {bookings.length === 0 ? (
          <p className="no-bookings">No bookings yet.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h3 className="listing-title">
                    {booking.listing?.title || "Unknown Listing"}
                  </h3>
                  <span 
                    className="booking-status"
                    style={{ 
                      color: getStatusColor(booking.status),
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}
                  >
                    {booking.status}
                  </span>
                </div>
                
                <div className="booking-details">
                  <div className="booking-dates">
                    <div className="date-item">
                      <strong>Check-in:</strong>
                      <span>{formatDate(booking.checkIn)}</span>
                    </div>
                    <div className="date-item">
                      <strong>Check-out:</strong>
                      <span>{formatDate(booking.checkOut)}</span>
                    </div>
                  </div>
                  
                  <div className="booking-info">
                    <p><strong>Guests:</strong> {booking.guests || booking.numberOfGuests}</p>
                    {booking.totalPrice && (
                      <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                    )}
                    {booking.listing?.location && (
                      <p><strong>Location:</strong> {booking.listing.location}</p>
                    )}
                  </div>
                </div>

                {/* Optional: Add booking actions */}
                <div className="booking-actions">
                  {booking.status === 'pending' && (
                    <button className="cancel-btn">Cancel Booking</button>
                  )}
                  <button className="view-listing-btn">View Listing</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* HOST LISTINGS SECTION */}
      {user.isHost && (
        <div className="listings-section">
          <h2>My Listings ({listings.length})</h2>
          {listings.length === 0 ? (
            <p className="no-listings">No listings created yet.</p>
          ) : (
            <div className="listings-list">
              {listings.map((listing) => (
                <MUICard sx={{ maxWidth: 345, m: 2 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image={listing?.images[0]?.url || "/placeholder.jpg"}
                alt={listing.title}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {listing.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {listing.description}
                </Typography>
                </CardContent>
            </CardActionArea>

            {/* 🔥 Actions: Edit + Delete */}
            <CardActions>
                <Button
                variant="outlined"
                color="primary"
                onClick={() => editListing(listing._id)}
                >
                Edit
                </Button>
                <Button
                variant="outlined"
                color="danger"
                onClick={() => deleteListing(listing._id)}
                >
                Delete
                </Button>
            </CardActions>
            </MUICard>
    
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;

// <div key={listing._id} className="listing-card">
//                   {/* <Card listing={listing}/> */}
//                     <div className="listing-image">
//                     {listing.images && listing.images.length > 0 ? (
//                       <img 
//                         src={listing.images.find(img => img.featured)?.url || listing.images[0]?.url} 
//                         alt={listing.title}
//                         style={{
//                             maxHeight:'5rem',
//                             maxWidth : '5rem',
//                         }}
//                         className="listing-thumbnail"
//                       />
//                     ) : (
//                       <div className="no-image-placeholder">No Image</div>
//                     )}
//                   </div>
                  
//                   <div className="listing-info">
//                     <div className="listing-header">
//                       <h3 className="listing-title">{listing.title}</h3>
//                       <span className="listing-price">₹{listing.price}/night</span>
//                     </div>
                    
//                     <div className="listing-details">
//                       <p><strong>Type:</strong> {listing.type || 'Property'}</p>
//                       <p><strong>Rating:</strong> {listing.averageRating} ⭐</p>
//                       {listing.reviews && (
//                         <p><strong>Reviews:</strong> {listing.reviews.length}</p>
//                       )}
//                     </div>
                    
//                     <div className="listing-description">
//                       <p>{listing.description.length > 100 
//                         ? `${listing.description.substring(0, 100)}...` 
//                         : listing.description}
//                       </p>
//                     </div>
//                   </div>
//                       <p><strong>Location:</strong> {listing.location}</p>
//                   <div className="listing-actions">
//                     <button 
//                       className="edit-listing-btn"
//                       onClick={() => editListing(listing._id)}
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       className="delete-listing-btn"
//                       onClick={() => deleteListing(listing._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>