import express from "express";
import {
  addCategory,
  editCategory,
  getByIdCategory,
  getCategory,
  removeCategory,
} from "../controllers/categoryController.js";
import { protect } from "../middlewares/authMiddleware.js";

const categoryRouter = express.Router();

// Get all categories (public)
categoryRouter.get("/categories", getCategory);


// Get all categories (public)
categoryRouter.get("/categories/:id", getByIdCategory);

// Add a category (protected)
categoryRouter.post("/categories", protect, addCategory);

// Update a category (protected)
categoryRouter.put("/categories/:id", protect, editCategory);

// Delete a category (protected)
categoryRouter.delete("/categories/:id", protect, removeCategory);

export default categoryRouter;