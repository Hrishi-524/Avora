import Review from "../models/Review.js";
import Listings from "../models/Listing.js";

export const saveReviewData = async (req, res) => {
    let { id } = req.params;
    let {comment , rating} = req.body;

    let listing = await Listings.findById(id);
    let newReview = new Review({
        comment : comment,
        rating : rating,
        createdAt: Date.now(),
    })
    listing.reviews.push(newReview._id)

    console.log("Review succesfully submitted")
    console.log(listing.reviews);

    await newReview.save();
    await listing.save();

    let populatedListing = await Listings.findById(id).populate("reviews").populate("host");
    let latestReview = populatedListing.reviews[populatedListing.reviews.length - 1];
    console.log("latest review")
    console.log(latestReview)

    let previousSum = listing.averageRating * (listing.reviews.length - 1);
    let newTotalRating = previousSum + latestReview.rating;
    let totalReviews = listing.reviews.length;
    listing.averageRating = newTotalRating / totalReviews;
    
    res.json(latestReview);
}