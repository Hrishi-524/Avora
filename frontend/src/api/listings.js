import axios from "axios";

export const fetchListings = async () => {
  try {
    const res = await axios.get('/api/listings');
    return res.data;
  } catch (error) {
    console.error("Error fetching listings", error);
    throw err;
  }
};

export const fetchListingById = async (id) => {
    try {
        const res = await axios.get(`/api/listings/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching listing", error);
    throw err;
    }
}
