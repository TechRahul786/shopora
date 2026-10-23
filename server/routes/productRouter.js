import express from "express"
import {adminOnly} from '../middlewares/authMiddleware.js'
import { addProduct, getProduct, getProductByCategory, getProductById } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get('/products',getProduct)
productRouter.get('/product/:id',getProductById)
productRouter.get('/productByCategory/:id',getProductByCategory)
productRouter.post('/addProduct',addProduct)

export default productRouter