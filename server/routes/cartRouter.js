import express from 'express'
import { addToCart, clearCart, getCart, removeFromCart, updateCartItemQuantity } from '../controllers/cartController.js'
import { protect } from '../middlewares/authMiddleware.js'

const cartRouter = express.Router()

cartRouter.get('/cart',protect,getCart)
cartRouter.post('/cart',protect,addToCart)
cartRouter.put('/cart/',protect,updateCartItemQuantity)
cartRouter.delete('/cart/:productId',protect,removeFromCart)
cartRouter.delete("/clear", protect, clearCart);

export default cartRouter