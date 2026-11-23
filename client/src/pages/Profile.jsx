import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope, FaEdit, FaSave } from "react-icons/fa";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Set user data from Redux
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || user.firstname || "",
        lastName: user.lastName || user.lastname || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/update-profile`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setMessage("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    return (
      (formData.firstName.charAt(0) || "U") +
      (formData.lastName.charAt(0) || "")
    ).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="max-w-3xl mx-auto">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Profile
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your personal information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          {/* Top Section */}
          <div className="bg-indigo-600 p-8 text-center">

            <div className="w-24 h-24 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold mx-auto shadow">
              {getInitials()}
            </div>

            <h2 className="text-xl font-semibold text-white mt-4">
              {formData.firstName} {formData.lastName}
            </h2>

            <p className="text-indigo-100 text-sm mt-1">
              {formData.email}
            </p>

          </div>

          {/* Form Section */}
          <div className="p-6 md:p-8">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Personal Information
              </h3>

              {!isEditing && (
                <button
                  onClick={() => {
                    setMessage("");
                    setIsEditing(true);
                  }}
                  className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100"
                >
                  <FaEdit />
                  Edit
                </button>
              )}
            </div>

            {message && (
              <div className="mb-5 p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 disabled:bg-gray-100"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 disabled:bg-gray-100"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500"
                  />

                  <p className="text-xs text-gray-400 mt-2">
                    Email address cannot be changed.
                  </p>
                </div>

              </div>

              {/* Buttons */}
              {isEditing && (
                <div className="flex gap-3 mt-8">

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    <FaSave />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setMessage("");
                      setFormData({
                        firstName: user?.firstName || user?.firstname || "",
                        lastName: user?.lastName || user?.lastname || "",
                        email: user?.email || "",
                      });
                    }}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                </div>
              )}

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;