import express from "express"
const router = express.Router({ mergeParams: true });
import { createListing, destroyListing, renderHomePage, renderListingById, searchListings } from "../controllers/listing.js";
import { isLoggedIn, upload } from "../middleware.js";
import { editListing } from "../../frontend/src/api/listings.js";

router.route("/")
.get(renderHomePage)

router.route("/:id")
.get(renderListingById);

router.route("/search")
.post(searchListings)

router.route("/new")
.post(isLoggedIn, upload.array("images", 10), createListing)

router.route("/delete/:id")
.delete(isLoggedIn, destroyListing)

router.route("/edit/:id")
.put(isLoggedIn, editListing)

export default router;