import express from "express"
const router = express.Router({ mergeParams: true })
import { verifyPayment } from "../controllers/payment.js"
import wrapAsync from "../errorhandling/wrapAsync.js"

router.route("/verify")
.post(wrapAsync(verifyPayment))

export default router