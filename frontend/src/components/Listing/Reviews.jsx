import './Reviews.css'
import ShowReview from './ShowReview'
import ReviewForm from './ReviewForm'
import { useEffect, useState } from 'react'
import { getUserInfo } from '../../utils/auth'
import * as React from "react";
import {deleteReviewById} from "../../api/Reviews.js";

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

    const deleteReview = (review) => {
        let reviewId = review._id;
        console.log("[Review.jsx] These are both Id's", reviewId, listing._id);
        deleteReviewById(reviewId, listing._id)
            .then((response) => {
                if (response.success) {
                    // Update the reviews state by filtering out the deleted review
                    setReviews(prevReviews => prevReviews.filter(r => r._id !== reviewId));
                    console.log("Review successfully deleted [Review.jsx]", response.deletedReview);
                }
            })
            .catch((error) => {
                console.log("Error while deleting the review [Review.jsx]", error)
            });
    }

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
                                    <div className="review-author">
                                        <div className="review-author-avatar">
                                            {review.author.username.charAt(0)}
                                        </div>
                                        <div className="review-author-name">
                                            {review.author.username}
                                        </div>
                                    </div>
                                    <div className="review-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="star">
                                                {i < (review.rating || 5) ? '★' : '☆'}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="review-content">{review.comment}</p>
                                {/* Only show delete button if the review belongs to the current user */}
                                {user && user.id === review.author._id && (
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            deleteReview(review);
                                        }} 
                                        type="button" 
                                        className="delete-review-button"
                                    >
                                        Delete
                                    </button>
                                )}
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
                    <span>{listing.averageRating ? listing.averageRating : 'none'} &nbsp;• {reviews.length} reviews</span>
                </div>
            </div>
            <ReviewForm listing={listing} reviews={reviews} setReviews={setReviews}/>
            {showReviews()}
        </div>
    )
}