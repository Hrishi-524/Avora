import express from "express"
const router = express.Router({ mergeParams: true });
import { renderHomePage, renderListingById } from "../controllers/listing.js";
import { isLoggedIn } from "../middleware.js";

router.route("/")
.get(renderHomePage)

router.route("/:id")
.get(renderListingById);

export default router;