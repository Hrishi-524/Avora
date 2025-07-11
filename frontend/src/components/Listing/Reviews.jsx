import './Reviews.css'
import ShowReview from './ShowReview'
import ReviewForm from './ReviewForm'
import { useEffect, useState } from 'react'
import { getUserInfo } from '../../utils/auth'

export default function Reviews({listing}) {
    let [user, setUser] = useState({})
    let [reviews, setReviews] = useState([])

    useEffect(() => {
        const userLoggedIn = getUserInfo();
        if (userLoggedIn) {
            setUser(userLoggedIn);
        }
    }, [])
    useEffect(() => {
    if (listing && listing.reviews) {
        setReviews(listing.reviews);
    }
    }, [listing]);
    const showReviews = () => {
        if (reviews.length === 0) {
            return (
                <div className="no-reviews">
                    <p>No reviews yet. Be the first to share your experience!</p>
                </div>
            );
        } else {
            return (
                <ul className="reviews-list">
                    {reviews.map((review, index) =>
                        review && review.comment ? (
                            <li key={index} className="review-item">
                                <div className="review-meta">
                                    <span></span>
                                    <span>•</span>
                                    <div className="review-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="star">
                                                {i < (review.rating || 5) ? '★' : '☆'}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="review-content">{review.comment}</p>
                            </li>
                        ) : (
                            <li key={index} className="review-item">
                                <p className="review-content">Invalid Review</p>
                            </li>
                        )
                    )}
                </ul>
            );
        }
    };

    return (
        <div className="reviews-div">
            <div className="reviews-header">
                <h3>Reviews</h3>
                <div className="reviews-rating">
                    <span className="star">★</span>
                    <span>{listing.averageRating ? listing.averageRating.toFixed(1) : 'N/A'} • {reviews.length} reviews</span>
                </div>
                {user && user.username && (
                    <div className="current-user">
                        <p>Logged in as: <strong>{user.username}</strong></p>
                    </div>
                )}
            </div>
            <ReviewForm listing={listing} reviews={reviews} setReviews={setReviews}/>
            {showReviews()}
        </div>
    )
}