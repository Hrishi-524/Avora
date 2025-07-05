import express from "express"
const router = express.Router({ mergeParams: true });
import { signupUser } from '../controllers/user.js';
import { verifyLogin } from '../controllers/user.js';

router.route("/signup")
.post(signupUser);

router.route("/login")
.post(verifyLogin)

export default router;
