import express from "express"
const router = express.Router({ mergeParams: true });
import { saveReviewData } from "../controllers/review.js"

router.route("/")
.post(saveReviewData);

export default router;