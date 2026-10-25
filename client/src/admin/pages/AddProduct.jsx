import React, { useState } from "react";
import {
  FiPackage,
  FiDollarSign,
  FiAlignLeft,
  FiLayers,
  FiBox,
  FiImage,
  FiStar,
  FiMessageSquare,
  FiPlus,
  FiArrowLeft,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { addProduct } from "../services/product";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
    ratings: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = addProduct(form)
    console.log(product);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Add New Product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add a new product to your Shopora store.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <form
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        onSubmit={handleSubmit}
      >
        {/* Card Header */}
        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-5 sm:px-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <FiPackage size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Product Information
            </h2>

            <p className="text-sm text-gray-500">
              Enter the details of your product below.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-7 p-5 sm:p-8">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Product Name <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <FiPackage
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter product name"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Price (₹) <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <FiDollarSign
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />

                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 1499"
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="stock"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Stock Quantity <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <FiBox
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />

                <input
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  placeholder="e.g. 50"
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <FiLayers
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />

              <input
                type="text"
                id="category"
                name="category"
                placeholder="e.g. Electronics, Clothing, Footwear"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <FiAlignLeft
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />

              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe your product, its features, and benefits..."
                onChange={handleChange}
                className="w-full resize-y rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Product Image URL
            </label>

            <div className="relative">
              <FiImage
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />

              <input
                type="text"
                id="image"
                name="image"
                placeholder="Image URL will be added later"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Image upload integration can be added later.
            </p>
          </div>

          {/* Ratings and Reviews */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="mb-5">
              <h3 className="font-semibold text-gray-900">Ratings & Reviews</h3>

              <p className="mt-1 text-sm text-gray-500">
                Enter the initial rating and number of reviews, if applicable.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Ratings */}
              <div>
                <label
                  htmlFor="ratings"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Rating (0–5)
                </label>

                <div className="relative">
                  <FiStar
                    className="absolute left-3 top-3.5 text-amber-500"
                    size={18}
                  />

                  <input
                    type="number"
                    id="ratings"
                    name="ratings"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="e.g. 4.5"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* Number of Reviews */}
              <div>
                <label
                  htmlFor="numReviews"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Number of Reviews
                </label>

                <div className="relative">
                  <FiMessageSquare
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />

                  <input
                    type="number"
                    id="numReviews"
                    name="numReviews"
                    min="0"
                    placeholder="e.g. 120"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="reset"
            className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Reset Form
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FiPlus size={18} />
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
