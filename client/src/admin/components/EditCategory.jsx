import React, { useEffect, useState } from "react";
import { getByIdCategory, updateCategory } from "../../services/category";
import {
  FiImage,
  FiUploadCloud,
  FiX,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";

const EditCategory = ({ update, onClose ,setNewAdded}) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [preData, setPreData] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError("");
    setSuccess("");
  };

  const removeSelectedImage = () => {
    setImage(null);
    setPreview(preData?.image || "");
    const fileInput = document.getElementById("category-image");

    if (fileInput) {
      fileInput.value = "";
    }

    setError("");
  };

  const imageUpload = async () => {
    if (!image) {
      return preData?.image || "";
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary environment variables are missing.");
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadedImage = await response.json();

    if (!response.ok || !uploadedImage.secure_url) {
      throw new Error(
        uploadedImage.error?.message || "Image upload failed."
      );
    }

    return uploadedImage.secure_url;
  };

  const getData = async () => {
    try {
      setFetching(true);
      setError("");

      const response = await getByIdCategory(update);
      const data = response.data;

      setPreData(data);
      setCategory({
        name: data.name || "",
        description: data.description || "",
      });
      setPreview(data.image || "");
    } catch (err) {
      console.error("Error fetching category:", err);
      setError(
        err.response?.data?.message || "Failed to load category."
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    getData();
  }, [update]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!category.name.trim() || !category.description.trim()) {
      setError("Please fill in the category name and description.");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await imageUpload();

      if (!imageUrl) {
        setError("Please select a category image.");
        return;
      }

      const finalCategoryData = {
        name: category.name.trim(),
        description: category.description.trim(),
        image: imageUrl,
      };

      const response = await updateCategory(update, finalCategoryData);

      if (response?.success === false) {
        throw new Error(response.message || "Failed to update category.");
      }

      setPreData((prev) => ({
        ...prev,
        ...finalCategoryData,
      }));

      setImage(null);
      setPreview(imageUrl);
      setSuccess("Category updated successfully.");
    } catch (err) {
      console.error("Category update error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update category."
      );
    } finally {
        setNewAdded(true)
      setLoading(false);
      onClose()
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-4 sm:p-6">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <FiImage size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Edit Category
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Update your category details and image.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              <FiCheckCircle size={18} />
              {success}
            </div>
          )}

          <div>
            <label
              htmlFor="category-name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Category Name <span className="text-red-500">*</span>
            </label>

            <input
              id="category-name"
              type="text"
              name="name"
              placeholder="Enter category name"
              onChange={handleChange}
              value={category.name}
              maxLength={100}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {category.name.length}/100
            </p>
          </div>

          <div>
            <label
              htmlFor="category-description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>

            <textarea
              id="category-description"
              name="description"
              placeholder="Describe this category..."
              onChange={handleChange}
              value={category.description}
              rows={4}
              maxLength={500}
              required
              className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {category.description.length}/500
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category Image <span className="text-red-500">*</span>
            </label>

            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 sm:p-5">
              {preview ? (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative h-44 w-full overflow-hidden rounded-xl border border-gray-200 bg-white sm:h-40 sm:w-44 sm:shrink-0">
                    <img
                      src={preview}
                      alt="Category preview"
                      className="h-full w-full object-cover"
                    />

                    {image && (
                      <span className="absolute left-2 top-2 rounded-md bg-indigo-600 px-2 py-1 text-xs font-medium text-white">
                        New image
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {image ? image.name : "Current category image"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {image
                        ? `${(image.size / (1024 * 1024)).toFixed(2)} MB`
                        : "Your existing image is currently selected."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <label
                        htmlFor="category-image"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                      >
                        <FiUploadCloud size={17} />
                        Change Image
                      </label>

                      {image && (
                        <button
                          type="button"
                          onClick={removeSelectedImage}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                          <FiX size={17} />
                          Cancel Change
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="category-image"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl px-4 py-8 text-center transition hover:bg-white"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <FiUploadCloud size={28} />
                  </div>

                  <p className="text-sm font-semibold text-gray-800">
                    Click to upload an image
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, WEBP up to 5 MB
                  </p>
                </label>
              )}

              <input
                id="category-image"
                type="file"
                name="image"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                <FiArrowLeft size={17} />
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Updating Category...
                </>
              ) : (
                <>
                  <FiCheckCircle size={18} />
                  Update Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;