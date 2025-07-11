import Listing from "../models/Listing.js";

export const renderHomePage = async (req, res) => {
    try {
        let listings = await Listing.find({});
        res.json(listings)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const renderListingById = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews").populate("host");
    let host = listing.host._id;
    let HostListings = await Listing.find({host : host});
    
    // Calculate host's overall rating properly
    let totalRatingPoints = 0;
    let totalReviews = 0;
    
    HostListings.forEach(hostListing => {
        if (hostListing.averageRating && hostListing.reviews.length > 0) {
            totalRatingPoints += hostListing.averageRating * hostListing.reviews.length;
            totalReviews += hostListing.reviews.length;
        }
    });
    
    let hostRating = totalReviews > 0 ? totalRatingPoints / totalReviews : 0;
    listing.hostRating = hostRating;
    
    console.log("console log at app.js /api/listings/:id")
    res.json(listing)
}

