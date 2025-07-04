import axios from "axios";

export const sendReviewData = async (data) => {
    console.log("send review data called")
    let res = await axios.post(`/api/listings/${data.listingId}/reviews`, {
        comment : data.comment,
        rating : data.rating,
    });
    return res.data;
}