import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaShoppingBag,
  FaCog,
  FaSignOutAlt,
  FaArrowRight,
  FaShieldAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../services/api";
import { clearState } from "../features/store/slice/authSclice";
import { removeCart } from "../features/store/slice/cartSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const firstName = user?.firstName || user?.firstname || "";
  const lastName = user?.lastName || user?.lastname || "";
  const email = user?.email || "";

  // Get user initials
  const getInitials = () => {
    return (
      (firstName.charAt(0) || "U") +
      (lastName.charAt(0) || "")
    ).toUpperCase();
  };

  // Account options
  const accountOptions = [
    {
      title: "Update Profile",
      description: "Manage your personal information",
      icon: <FaEdit />,
      color: "bg-blue-50 text-blue-600",
      path: "/profile/update",
    },
    {
      title: "My Orders",
      description: "View and track your orders",
      icon: <FaShoppingBag />,
      color: "bg-purple-50 text-purple-600",
      path: "/orders",
    },
    {
      title: "Settings",
      description: "Manage your account settings",
      icon: <FaCog />,
      color: "bg-orange-50 text-orange-600",
      path: "/settings",
    },
  ];

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(clearState());
      dispatch(removeCart());
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            My Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Welcome back, {firstName || "User"}! Manage your account here.
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Cover */}
          <div className="h-36 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 md:h-44">
          </div>

          <div className="px-6 pb-7">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              {/* User Details */}
              <div className="-mt-14 flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left">

                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-white bg-indigo-50 text-3xl font-bold text-indigo-600 shadow-md">
                  {getInitials()}
                </div>

                <div className="sm:ml-5 sm:mb-2">
                  <h2 className="mt-3 text-2xl font-bold lg:text-white xl:text-white   text-gray-800 sm:mt-0">
                    {firstName} {lastName}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {email}
                  </p>

                  <div className="mt-2 flex items-center justify-center gap-2 text-xs font-medium text-green-600 sm:justify-start">
                    <FaShieldAlt />
                    <span>Account Member</span>
                  </div>
                </div>

              </div>

              {/* Account Badge */}
              <div className="mb-1 flex items-center justify-center gap-2 self-center rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 sm:self-auto">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Active Account
              </div>

            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Personal Information */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Personal Information
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Your account details
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <FaUser size={18} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* First Name */}
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-3 flex items-center gap-2 text-gray-400">
                  <FaUser size={14} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    First Name
                  </span>
                </div>

                <p className="font-semibold text-gray-800">
                  {firstName || "Not available"}
                </p>
              </div>

              {/* Last Name */}
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="mb-3 flex items-center gap-2 text-gray-400">
                  <FaUser size={14} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Last Name
                  </span>
                </div>

                <p className="font-semibold text-gray-800">
                  {lastName || "Not available"}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
                <div className="mb-3 flex items-center gap-2 text-gray-400">
                  <FaEnvelope size={14} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Email Address
                  </span>
                </div>

                <p className="break-all font-semibold text-gray-800">
                  {email || "Not available"}
                </p>
              </div>

            </div>
          </div>

          {/* Account Overview */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-lg font-bold text-gray-800">
              Account Overview
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <FaUser size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Account Type
                  </p>
                  <p className="font-semibold text-gray-800">
                    Customer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-green-50 p-3 text-green-600">
                  <FaShieldAlt size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Account Status
                  </p>
                  <p className="font-semibold text-gray-800">
                    Active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                  <FaCalendarAlt size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Welcome to
                  </p>
                  <p className="font-semibold text-gray-800">
                    Shopora
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Account Actions */}
        <div className="mt-8">

          <h3 className="mb-5 text-xl font-bold text-gray-800">
            Account Settings
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {accountOptions.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-md"
              >

                <div className={`rounded-xl p-4 text-xl ${item.color}`}>
                  {item.icon}
                </div>

                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-xs text-gray-400">
                    {item.description}
                  </p>
                </div>

                <FaArrowRight className="text-sm text-gray-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" />

              </button>
            ))}

          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 rounded-2xl border border-red-100 bg-white p-5 shadow-sm">

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <FaSignOutAlt size={20} />
              </div>

              <div>
                <h4 className="font-bold text-gray-800">
                  Logout from your account
                </h4>

                <p className="mt-1 text-sm text-gray-400">
                  Sign out from your Shopora account.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleLogout()}
              className="w-full rounded-xl bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white sm:w-auto"
            >
              Logout
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
