import express from "express"
const router = express.Router({ mergeParams: true });
import { signupUser , verifyLogin , fetchUserDetails, fetchUserBookings, fetchHostListings } from '../controllers/user.js';
import { isLoggedIn } from "../middleware.js";
import wrapAsync from "../errorhandling/wrapAsync.js";

router.route("/signup")
.post(wrapAsync(signupUser))

router.route("/login")
.post(wrapAsync(verifyLogin))

router.route("/user/:id")
.get(wrapAsync(isLoggedIn), wrapAsync(fetchUserDetails))

router.route("/bookings/:id")
.get(wrapAsync(isLoggedIn), wrapAsync(fetchUserBookings))

router.route("/host/:id")
.get(wrapAsync(isLoggedIn), wrapAsync(fetchHostListings))

export default router;
