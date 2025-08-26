import express from "express"
const router = express.Router({ mergeParams: true });
import { createListing, destroyListing, renderHomePage, renderListingById, searchListings } from "../controllers/listing.js";
import { isLoggedIn, upload } from "../middleware.js";

router.route("/")
.get(renderHomePage)

router.route("/:id")
.get(renderListingById);

router.route("/search")
.post(searchListings)

router.route("/new")
.post(isLoggedIn, upload.array("images", 10), createListing)

router.route("/delete")
.delete(isLoggedIn, destroyListing)

export default router;