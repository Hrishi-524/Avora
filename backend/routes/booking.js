import express from "express"
import { isLoggedIn } from "../middleware.js"
const router = express.Router({ mergeParams: true })
import { initiateBooking } from "../controllers/booking.js"
import wrapAsync from "../errorhandling/wrapAsync.js"

router.route("/")
.post(wrapAsync(isLoggedIn), wrapAsync(initiateBooking))

export default router