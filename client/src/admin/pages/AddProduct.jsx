import React, { useEffect, useState } from "react";
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
} from "react-icons/fi";
import { addProduct } from "../../services/product";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
    ratings: "",
    numReviews: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false); // Optional: Loading state during upload
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Save the raw file for upload
    }
  };

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = form.image;

      // 1. Upload to Cloudinary if an image file is selected
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        ); // Replace with your preset name
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Replace with your cloud name
          {
            method: "POST",
            body: data,
          },
        );

        const uploadedImage = await response.json();
        imageUrl = uploadedImage.secure_url; // This is the hosted image link
      }

      // 2. Combine the final form data with the Cloudinary image URL
      const finalProductData = {
        ...form,
        image: imageUrl,
      };

      console.log("Submitting to backend:", finalProductData);

      await addProduct(finalProductData);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setForm({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
        image: "",
        ratings: "",
        numReviews: "",
      });
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div>Loading ..... </div>;
  }

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
        encType="multipart/form-data"
        method="post"
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
                value={form.name}
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
                  value={form.price}
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
                  value={form.stock}
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
                value={form.category}
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
                value={form.description}
                className="w-full resize-y rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Image URL */}

          {/* Product Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Product Image <span className="text-red-500">*</span>
            </label>

            <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 transition hover:border-indigo-400 sm:p-8">
              {preview ? (
                <div className="flex flex-col items-center">
                  {/* Image Preview */}
                  <img
                    src={preview}
                    alt="Product preview"
                    className="h-48 w-full max-w-sm rounded-lg object-contain"
                  />

                  <p className="mt-3 max-w-full truncate text-sm text-gray-600">
                    {image?.name}
                  </p>

                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <label
                      htmlFor="image"
                      className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Change Image
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setPreview("");
                      }}
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="flex cursor-pointer flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <FiImage size={28} />
                  </div>

                  <p className="text-sm font-semibold text-gray-800">
                    Click to upload an image
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    PNG, JPG, JPEG or WEBP
                  </p>

                  <span className="mt-4 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
                    Choose Image
                  </span>
                </label>
              )}

              <input
                type="file"
                id="image"
                name="image"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                value={form.image}
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file) {
                    setImage(file);
                  }
                }}
              />
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Select an image from your device to preview it before uploading.
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
                    value={form.ratings}
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
                    value={form.numReviews}
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
