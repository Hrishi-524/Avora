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
            // Token will be automatically included via axios defaults set in user.js
            const res = await axios.get(`/api/listings/${id}`);
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