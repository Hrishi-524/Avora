import Listing from "../models/Listing.js";
import User from "../models/User.js";

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

export const createListing = async (req, res) => {
    try {
        const user = await User.findOne({username : req.body.host})
        const imageUrls = req.files.map(file => file.path)
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

        console.log('---------------NEW LISTING-------------------')
        console.log(newListing)
        await newListing.save()

        const populatedListing = (await newListing.populate("host")).populate("reviews")
        
        res.status(201).json({
            populatedListing,
        })
    } catch (error) {
        console.error('Create Listing Failed :', error);
        res.status(500).json({
            success: false,
            message: 'create failed',
            error: error.message
        });
    }
}

export const destroyListing = async (req, res) => {
    try {
        const { id } = req.params
        const deletedListing = await Listing.findByIdAndDelete(id)
        console.log(`succesfully deleted listing`)
        res.status(200).json({
            success: true,
            message: 'destroy success',
            deletedListing,
        })
    } catch (error) {
        console.error('Destroy Listing Failed :', error);
        res.status(500).json({
            success: false,
            message: 'destroy failed',
            error: error.message
        });
    }
}

export const editListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const userId = req.user.id; // comes from auth middleware (JWT decoded)

    // Find the listing
    let listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    // Check if the current user is the owner
    if (listing.owner.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized to edit this listing" });
    }

    // Update fields
    const updates = req.body; // frontend sends updated fields
    listing = await Listing.findByIdAndUpdate(listingId, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      listing,
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating listing",
    });
  }
};