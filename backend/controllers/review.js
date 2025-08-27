import Review from "../models/Review.js";
import Listings from "../models/Listing.js";

export const saveReviewData = async (req, res) => {
    let { id } = req.params;
    let {comment , rating, author} = req.body;

    let listing = await Listings.findById(id);
    let newReview = new Review({
        comment : comment,
        rating : rating,
        createdAt: Date.now(),
        author : author,
    })
    listing.reviews.push(newReview._id)

    await newReview.save();
    await listing.save();

    let populatedReview = await Review.findById(newReview._id).populate("author");

    let reviews = await Review.find({ _id: { $in: listing.reviews } });
    let totalReviews = reviews.length;
    let avg = 0;
    if (totalReviews > 0) {
        avg = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
    }
    listing.averageRating = avg;

    await listing.save();
    console.log(`POST/ADD NEW REVIEW: ${newReview.id}`)
    
    res.json(populatedReview);
}

export const deleteReview = async (req, res) => {
    let { listingId, reviewId } = req.params;

    await Listings.findByIdAndUpdate(listingId, {
        $pull: { reviews: reviewId }
    });

    let deletedReview = await Review.findByIdAndDelete(reviewId);

    console.log(`DELETE/DELETE REVIEW: ${reviewId}, LISTING: ${listingId}`)
    res.json({ success: true, deletedReview });
}
