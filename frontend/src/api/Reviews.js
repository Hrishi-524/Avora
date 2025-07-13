import axios from "axios";

export const sendReviewData = async (data) => {
    console.log("send review data called this is the data to be submitted [frontend/api/Reviews.js]", data);
    let res = await axios.post(`/api/listings/${data.listingId}/reviews`, {
        comment : data.comment,
        rating : data.rating,
        author : data.author,
    });
    return res.data;
}

export const deleteReviewById = async (reviewId, listingId) => {
    let response = await axios.delete(`/api/listings/${listingId}/reviews/${reviewId}`);
    return response.data;
}
