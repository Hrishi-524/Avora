import './ReviewForm.css'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { sendReviewData } from '../../api/Reviews';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let data = {
            comment : formData.get("comment"),
            rating : formData.get("hover-feedback"),
            listingId : listing._id,
        }
        console.log(data);
        sendReviewData(data)
        .then((newReview) => {
            console.log("submitted new review")
            console.log(newReview)
            setReviews(prevReviews => [...prevReviews, newReview])
        })
    }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h4>Share Your Experience</h4>
            
            <div className="review-form-fields">
                <TextField 
                    name="comment" 
                    label="Write your review" 
                    multiline 
                    rows={4}
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
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        sx={{fontFamily:'var(--ff)'}}
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