import express from "express"
const router = express.Router({ mergeParams: true });
import { renderHomePage, renderListingById, searchListings } from "../controllers/listing.js";
import { isLoggedIn } from "../middleware.js";

router.route("/")
.get(renderHomePage)

router.route("/:id")
.get(renderListingById);

router.route("/search")
.post(searchListings)

export default router;