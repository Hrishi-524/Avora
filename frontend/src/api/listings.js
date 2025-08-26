import axios from "axios";

export const fetchListings = async () => {
    try {
        const res = await axios.get('/api/listings');
        return res.data;
    } catch (error) {
        console.error("Error fetching listings", error);
        throw error;
    }
};

export const fetchListingById = async (id) => {
    try {
        console.log(`fetch`)
        // Token will be automatically included via axios defaults set in user.js
        const res = await axios.get(`/api/listings/${id}`);
        console.log(`res.data`,res.data)
        return res.data;
    } catch (error) {
        console.error("Error fetching listing", error);
        throw error; // Fixed: was 'err' but should be 'error'
    }
}

export const sendSearchInfo = async (searchData) => {
    try {
        const response = await axios.post('/api/listings/search', searchData);
        return response.data; // Return the data
    } catch (error) {
        console.error("Error sending search info", error);
        throw error;
    }
}

export const createListing = async (newListing) => {
    try {
        const formData = new FormData();
        console.log('checkpoint')
        // Append regular fields
        Object.keys(newListing).forEach(key => {
            if (key !== "images") {
                formData.append(key, newListing[key]);
                 if (Array.isArray(value)) {
                    // Append each array element separately
                    value.forEach(v => formData.append(key, v));
                } else {
                    formData.append(key, value);
                }
            }
        });

        // Append images
        if (newListing.images && newListing.images.length > 0) {
            newListing.images.forEach((file) => {
                formData.append("images", file); // 'images' matches multer field name
            });
        }

        console.log('formdata to be sent by axios', formData)
        const response = await axios.post('/api/listings/new', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("unable to create listing", error);
        throw error;
    }
}

export const destroyListing = async (listingId) => {
    try {
        const res = await axios.delete(`/api/listings/delete/${listingId}`);
        return res.data.deletedListing;
    } catch (error) {
        console.error("unable to create listing", error);
        throw error;
    }
}

export const editListing = async (listingId, editedListing) => {
    try {
        const res = await axios.put(`/api/listings/edit/${listingId}`,editedListing)
    } catch (error) {
        console.error("unable to create listing", error);
        throw error;
    }
}