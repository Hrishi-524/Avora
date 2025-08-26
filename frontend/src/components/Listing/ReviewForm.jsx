import './ReviewForm.css'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { sendReviewData } from '../../api/Reviews';
import {getUserInfo, isAuthenticated} from "../../utils/auth.js";
import { useNavigate } from 'react-router-dom';

const labels = {
  0.5: 'Worst',
  1: 'Bad',
  1.5: 'Poor',
  2: 'Not good',
  2.5: 'Ok',
  3: 'Nice',
  3.5: 'Good',
  4: 'Great',
  4.5: 'Excellent',
  5: 'Outstanding',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


export default function ReviewForm({listing, reviews,setReviews}) {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if user is authenticated
        if (!isAuthenticated()) {
            alert('Please log in to submit a review');
            navigate('/login');
            return;
        }
        
        const user = getUserInfo();
        console.log("this is user [ReviewForm.jsx] ", user);
        
        // Double check user info is valid
        if (!user || !user.id) {
            alert('Authentication error. Please log in again.');
            navigate('/login');
            return;
        }
        
        let formData = new FormData(e.target);
        let data = {
            comment : formData.get("comment"),
            rating : value, // Use the state value instead of form data
            listingId : listing._id,
            author : user.id,
        }
        console.log("this  is data to be submitted [ReviewForm.jsx]", data);
        sendReviewData(data)
        .then((newReview) => {
            console.log("submitted new review [ReviewForm.jsx]")
            console.log(newReview)
            setReviews(prevReviews => [newReview, ...prevReviews])
            // Clear the form after successful submission
            e.target.reset();
            setValue(2);
        })
        .catch((error) => {
            console.error('Error submitting review:', error);
            alert('Error submitting review. Please try again.');
        })
    }

    // Don't show the form if user is not authenticated
    if (!isAuthenticated()) {
        return (
            <div className="review-form">
                <h4>Share Your Experience</h4>
                <div className="login-prompt">
                    <p>Please <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>log in</a> to write a review.</p>
                </div>
            </div>
        );
    }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h4>Share Your Experience</h4>
            
            <div className="review-form-fields">
                <TextField 
                    name="comment" 
                    label="Write your review" 
                    multiline 
                    rows={1}
                    fullWidth
                    placeholder="Tell others about your experience..."
                />
                
                <div className="rating-section">
                    <span className="rating-label">Rating:</span>
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{color:'var(--bg-dark)'}}/>}
                        sx={{fontFamily:'var(--ff)',
                            color: '#FFD700' ,
                        }}
                    />
                    {value !== null && (
                        <span className="rating-label">{labels[hover !== -1 ? hover : value]}</span>
                    )}
                </div>
            </div>
            
            <div className="review-form-actions">
                <button type='submit' className="review-submit-btn">Submit Review</button>
            </div>
        </form>
    )
}