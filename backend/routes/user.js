import express from "express"
const router = express.Router({ mergeParams: true });
import { signupUser , verifyLogin , fetchUserDetails, fetchUserBookings, fetchHostListings } from '../controllers/user.js';
import { isLoggedIn } from "../middleware.js";

router.route("/signup")
.post(signupUser);

router.route("/login")
.post(verifyLogin)

router.route("/user/:id")
.get(isLoggedIn, fetchUserDetails)

router.route("/bookings/:id")
.get(isLoggedIn, fetchUserBookings)

router.route("/host/:id")
.get(isLoggedIn, fetchHostListings)

export default router;
