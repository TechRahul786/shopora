import mongoose from "mongoose";
import Category from "../models/category.js";

// GET: Fetch all categories
export const getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: categories.length
        ? "Categories fetched successfully."
        : "No categories found.",
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// POST: Add a new category
export const addCategory = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;

    if (!name?.trim() || !description?.trim() || !image) {
      return res.status(400).json({
        success: false,
        message: "Name, description, and image are required.",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      description: description.trim(),
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Category added successfully.",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// PUT: Update a category
export const editCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }

    if (!name?.trim() || !description?.trim() || !image) {
      return res.status(400).json({
        success: false,
        message: "Name, description, and image are required.",
      });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description.trim(),
        image,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE: Remove a category
export const removeCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
