import express from "express"
import { isLoggedIn } from "../middleware.js"
const router = express.Router({ mergeParams: true })
import { initiateBooking } from "../controllers/booking.js"

router.route("/")
.post(isLoggedIn, initiateBooking)

export default router