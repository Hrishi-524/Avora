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
    let listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
                model: 'User'
            }
        })
        .populate("host");
    console.log("Listing with populated reviews and host:");
    console.log(listing);
    res.json(listing)
}

