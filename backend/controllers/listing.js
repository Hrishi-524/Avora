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

export const searchListings = async (req, res) => {
    try {
        const {location, checkIn, checkOut, guests} = req.body

        let searchQuery = {}

        if(location) {
            searchQuery.$or =  [
                { location: { $regex: location, $options: 'i' } },
                { country: { $regex: location, $options: 'i' } }, 
                { title: { $regex: location, $options: 'i' } }
            ]
        }

        const listings = await Listing.find(searchQuery).populate('host', 'name').populate('reviews') 
        
        res.json({
            success: true,
            results: listings,
            count: listings.length,
            searchParams: { location, checkIn, checkOut, guests }
        }); 
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            message: 'Search failed',
            error: error.message
        });
    }
}

