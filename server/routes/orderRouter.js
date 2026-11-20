import express from "express"
import { addOrders, getOrders } from "../controllers/ordersController.js"
import { protect } from "../middlewares/authMiddleware.js";

const orderRouter = express.Router()

orderRouter.get('/order',protect,getOrders)
orderRouter.post('/order',protect,addOrders)


export default orderRouter