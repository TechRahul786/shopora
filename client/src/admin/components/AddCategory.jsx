import React, { useState } from 'react';
import { addCategory } from '../../services/category';

const AddCategory = ({setNewAdded,handleCloseModal}) => {
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        setImage(null);
        return;
      }

      setImage(file);
      setError('');
    }
  };

  // Upload image to Cloudinary
  const imageUpload = async () => {
    if (!image) {
      throw new Error('Please select an image.');
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary environment variables are missing.');
    }

    const formData = new FormData();

    formData.append('file', image);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const uploadedImage = await response.json();

    if (!response.ok || !uploadedImage.secure_url) {
      throw new Error(
        uploadedImage.error?.message || 'Image upload failed.'
      );
    }

    return uploadedImage.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!category.name.trim() || !category.description.trim() || !image) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await imageUpload();

      const finalCategoryData = {
        ...category,
        name: category.name.trim(),
        description: category.description.trim(),
        image: imageUrl,
      };

      console.log('Category data:', finalCategoryData);

      const res = await addCategory(finalCategoryData);

      console.log('Category response:', res);

      setCategory({
        name: '',
        description: '',
      });

      setImage(null);

      e.target.reset();

    } catch (err) {
      console.error('Category submission error:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Something went wrong.'
      );
    } finally {
        setNewAdded(true)
      setLoading(false);
      handleCloseModal()
    }
  };

  return (
    <div className="p-5">
      {error && (
        <p className="m-1 rounded-lg border border-red-500 bg-red-100 p-3 text-red-500">
          {error}
        </p>
      )}

      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          onChange={handleChange}
          className="m-2 rounded-lg border p-2"
          value={category.name}
        />

        <textarea
          name="description"
          placeholder="Category Description"
          onChange={handleChange}
          className="m-2 rounded-lg border p-2"
          value={category.description}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="m-2 rounded-lg border p-2"
        />

        {image && (
          <p className="mx-2 text-sm text-gray-600">
            Selected image: {image.name}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-fit rounded-lg bg-gray-700 p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Adding Category...' : 'Add Category'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;