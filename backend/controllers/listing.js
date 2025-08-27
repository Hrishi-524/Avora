import Listing from "../models/Listing.js";
import User from "../models/User.js";
import ExpressError from "../errorhandling/ExpressError.js";

export const renderHomePage = async (req, res) => {
    let listings = await Listing.find({});
    console.log(`GET/RENDER HOME PAGE`)
    res.json(listings)
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
    if (!listing) throw new ExpressError("Listing not found", 404);
    console.log(`GET/RENDER LISTING PAGE : ${id}`)
    res.json(listing)
}

export const searchListings = async (req, res) => {
    const {location, checkIn, checkOut, guests} = req.body

    let searchQuery = {}

    if(location) {
        searchQuery.$or =  [
            { location: { $regex: location, $options: 'i' } },
            { country: { $regex: location, $options: 'i' } }, 
            { title: { $regex: location, $options: 'i' } }
        ]
    }

    const listings = await Listing.find(searchQuery).populate('host', 'username email').populate('reviews') 
    console.log(`POST/SEARCH LISTINGS BY QUERY`)
    res.json({
        success: true,
        results: listings,
        count: listings.length,
        searchParams: { location, checkIn, checkOut, guests }
    }); 
}

export const createListing = async (req, res) => {
    const user = await User.findOne({username : req.body.host})
    const imageObjects = req.files.map(file => ({
        filename: file.filename || file.originalname,  
        featured: false, 
        url: file.path,  
    }))

    const newListing = new Listing({
        ...req.body,
        host : user._id,
        images: imageObjects,
    })

    if(!user.isHost) {
        user.isHost = true;
        await user.save();
    }

    await newListing.save()

    const populatedListing = (await newListing.populate("host")).populate("reviews")
    console.log(`POST/CREATE LISTING BY USER: ${user.id}, ${user.username}`)
    
    res.status(201).json({
        populatedListing,
    })
}

export const destroyListing = async (req, res) => {
    const { id } = req.params
    const deletedListing = await Listing.findByIdAndDelete(id)
    if (!deletedListing) throw new ExpressError("Listing not found", 404);
    console.log(`DELETE/DELETE LISTING BY ID: ${id}`)
    res.status(200).json({
        success: true,
        message: 'destroy success',
        deletedListing,
    })
}

export const editListing = async (req, res) => {
    const listingId = req.params.id;
    const userId = req.user.id;

    let listing = await Listing.findById(listingId);
    if (!listing) throw new ExpressError("Listing not found", 404);

    if (listing.host.toString() !== userId) {
        throw new ExpressError("Not authorized to edit this listing", 403);
    }

    const updates = req.body;
    listing = await Listing.findByIdAndUpdate(listingId, updates, {
        new: true,
        runValidators: true,
    });
    console.log(`PUT/EDIT LISTING BY ID: ${listingId}, USER: ${userId}`)

    return res.status(200).json({
        success: true,
        message: "Listing updated successfully",
        listing,
    });
};