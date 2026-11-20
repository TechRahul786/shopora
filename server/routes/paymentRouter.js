import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { stripePayment } from '../controllers/paymentController.js'
const paymetRouter = express.Router()

paymetRouter.post("/payment/stripe", protect, stripePayment);
export default paymetRouter