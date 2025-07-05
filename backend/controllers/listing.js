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
    let listing = await Listing.findById(id);
    let listen = await listing.populate("reviews");
    console.log("console log at app.js /api/listings/:id")
    res.json(listen)
}

