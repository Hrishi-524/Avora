import express from "express"
const router = express.Router({ mergeParams: true })
import { verifyPayment } from "../controllers/payment.js"

router.route("/verify")
.post(verifyPayment)

export default router