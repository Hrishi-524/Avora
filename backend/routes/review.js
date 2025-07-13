import express from "express"
const router = express.Router({ mergeParams: true });
import {deleteReview, saveReviewData} from "../controllers/review.js"
import {isLoggedIn} from "../middleware.js";

router.route("/")
    .post(isLoggedIn, saveReviewData);

router.route("/:reviewId")
    .delete(isLoggedIn, deleteReview)

export default router;