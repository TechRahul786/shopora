import express from "express";
import {
  addProduct,
  getProduct,
  getProductById,
  getProductByCategory,
  editProduct,
  removeProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProduct);

router.get("/products/:id", getProductById);

router.get("/products/category/:id", getProductByCategory);

router.post("/products", addProduct);

router.put("/products/:id", editProduct);

router.delete("/products/:id", removeProduct);

export default router;
