import express from "express"
import { addOrders, getAllOrders, getOrders, updateOrderStatus } from "../controllers/ordersController.js"
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const orderRouter = express.Router()


// User routes
orderRouter.get("/order", protect, getOrders);
orderRouter.post("/order", protect, addOrders);

// Admin routes
orderRouter.get("/orders", protect, adminOnly, getAllOrders);
orderRouter.patch("/orders/:id/status", protect, adminOnly, updateOrderStatus);


export default orderRouter