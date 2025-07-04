import './Reviews.css'
import ShowReview from './ShowReview'
import ReviewForm from './ReviewForm'
import { useEffect, useState } from 'react'

export default function Reviews({listing}) {
    let [reviews, setReviews] = useState([])

    useEffect(() => {
    if (listing && listing.reviews) {
        setReviews(listing.reviews);
    }
    }, [listing]);
    const showReviews = () => {
        if (reviews.length === 0) {
            return <p>No reviews so far</p>;
        } else {
            console.log("showreviews ------")
            console.log(reviews)
            return (
                <ul>
                    {reviews.map((review, index) =>
                        review && review.comment ? (
                            <li key={index}>{review.comment}</li>
                        ) : (
                            <li key={index}>Invalid Review</li>
                        )
                    )}
                </ul>
            );
        }
    };

    return (
        <div className="reviews-div">
            <ReviewForm listing={listing} reviews={reviews} setReviews={setReviews}/>
            {showReviews()}
        </div>
    )
}