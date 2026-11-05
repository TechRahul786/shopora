import React, { useEffect, useState } from "react";
import { FiUploadCloud, FiX, FiArrowLeft, FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getProductsById, updateProduct } from "../../services/product";

const EditProduct = ({handleCloseModal,editId}) => {
  const navigate = useNavigate();
  console.log(editId)

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    ratings: "",
    numReviews: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  console.log(formData)
  
  // Prefill this state with product data from your API.
  useEffect(() => {

      async function fetchProduct() {
        const product = await getProductsById(editId)
        setFormData(product);
        setPreview(product.image);
      }
    
      fetchProduct()
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Please select a JPG, PNG, or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should not exceed 5 MB.");
      e.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  const uploadImage = async () => {
    if (!image) return preview;

    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    setUploading(true);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "Image upload failed.");
      }

      return result.secure_url;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage();

      const updatedProduct = {
        ...formData,
        image: imageUrl,
      };

      console.log("Updated product:", updatedProduct);

     
      await updateProduct(editId, updatedProduct);

    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="w-full bg-white p-4 sm:p-6">

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleCloseModal()}
              className="rounded-lg border border-gray-200 bg-white p-2.5 text-gray-600 hover:bg-gray-100"
            >
              <FiArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Edit Product
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Update your product information.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full"
        >
          <div className="mb-7 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Product Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit the details below to update your product.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Product Name */}
            <div>
              <label className={labelClass}>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={inputClass}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className={labelClass}>Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                className={inputClass}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className={labelClass}>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className={labelClass}>Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                min="0"
                className={inputClass}
                required
              />
            </div>

            {/* Ratings */}
            <div>
              <label className={labelClass}>Ratings</label>
              <input
                type="number"
                name="ratings"
                value={formData.ratings}
                onChange={handleChange}
                placeholder="0 - 5"
                min="0"
                max="5"
                step="0.1"
                className={inputClass}
              />
            </div>

            {/* Reviews */}
            <div>
              <label className={labelClass}>Number of Reviews</label>
              <input
                type="number"
                name="numReviews"
                value={formData.numReviews}
                onChange={handleChange}
                placeholder="Enter number of reviews"
                min="0"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={5}
                className={`${inputClass} resize-none`}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className={labelClass}>Product Image</label>

              <div className="flex flex-col gap-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center">
                {preview ? (
                  <div className="relative h-32 w-32 shrink-0">
                    <img
                      src={preview}
                      alt="Product preview"
                      className="h-full w-full rounded-lg border border-gray-200 bg-white object-contain"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600"
                    >
                      <FiX size={15} />
                    </button>
                  </div>
                ) : (
                  <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400">
                    <FiUploadCloud size={35} />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="productImage"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    <FiUploadCloud size={17} />
                    {preview ? "Change Image" : "Upload Image"}
                  </label>

                  <input
                    type="file"
                    id="productImage"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    JPG, PNG or WEBP. Maximum file size: 5 MB.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? "Uploading Image..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
  );
};

export default EditProduct;