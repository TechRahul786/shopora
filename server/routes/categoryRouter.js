import express from "express";
import { addCategory, getCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router()

categoryRouter.get('/categories',getCategory)
categoryRouter.post('/addCategory',addCategory)
export default categoryRouter