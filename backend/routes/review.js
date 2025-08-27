import express from "express"
const router = express.Router({ mergeParams: true });
import {deleteReview, saveReviewData} from "../controllers/review.js"
import {isLoggedIn} from "../middleware.js";
import wrapAsync from "../errorhandling/wrapAsync.js";

router.route("/")
    .post(wrapAsync(isLoggedIn), wrapAsync(saveReviewData))

router.route("/:reviewId")
    .delete(wrapAsync(isLoggedIn), wrapAsync(deleteReview))

export default router;