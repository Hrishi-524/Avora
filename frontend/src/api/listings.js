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
