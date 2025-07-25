import Review from "../models/Review.js";
import Listings from "../models/Listing.js";
import user from "../models/User.js";

export const saveReviewData = async (req, res) => {
    let { id } = req.params;
    let {comment , rating, author} = req.body;
    console.log("This is in saveReviewData backend [backend/controllers/review.js]", comment, rating, author);

    let listing = await Listings.findById(id);
    let newReview = new Review({
        comment : comment,
        rating : rating,
        createdAt: Date.now(),
        author : author,
    })
    listing.reviews.push(newReview._id)

    console.log("Review succesfully submitted")
    console.log(listing.reviews);

    await newReview.save();
    await listing.save();

    // Populate the new review with author information before sending back
    let populatedReview = await Review.findById(newReview._id).populate("author");
    console.log("New review with populated author:");
    console.log(populatedReview);

    // Update average rating
    let previousSum = listing.averageRating * (listing.reviews.length - 1);
    let newTotalRating = previousSum + parseInt(rating);
    let totalReviews = listing.reviews.length;
    listing.averageRating = newTotalRating / totalReviews;
    await listing.save();
    
    res.json(populatedReview);
}

export const deleteReview = async (req, res) => {
    let { listingId, reviewId } = req.params;
    console.log("These are both Id's in backend [backend/controllers/review.js]", reviewId);
    
    // Remove the review from the listing's reviews array
    await Listings.findByIdAndUpdate(listingId, {
        $pull: { reviews: reviewId }
    });
    
    // Delete the review
    let deletedReview = await Review.findByIdAndDelete(reviewId);
    console.log("Review succesfully deleted [backend/controllers/review.js]", deletedReview);
    
    // Send response back to frontend
    res.json({ success: true, deletedReview });
}
