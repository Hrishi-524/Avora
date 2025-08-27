import express from "express"
const router = express.Router({ mergeParams: true });
import { createListing, destroyListing, renderHomePage, renderListingById, searchListings, editListing } from "../controllers/listing.js";
import { isLoggedIn, upload } from "../middleware.js";
import wrapAsync from "../errorhandling/wrapAsync.js";

router.route("/")
.get(wrapAsync(renderHomePage))

router.route("/search")
.post(wrapAsync(searchListings))

router.route("/new")
.post(wrapAsync(isLoggedIn), upload.array("images", 10), wrapAsync(createListing))

router.route("/delete/:id")
.delete(wrapAsync(isLoggedIn), wrapAsync(destroyListing))

router.route("/edit/:id")
.put(wrapAsync(isLoggedIn), wrapAsync(editListing))

router.route("/:id")
.get(wrapAsync(renderListingById));

export default router;