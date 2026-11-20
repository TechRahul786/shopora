import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import {
  FaHouse,
  FaArrowLeft,
  FaBagShopping,
  FaMagnifyingGlass,
} from "react-icons/fa6";
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-3xl text-center">

        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-12">
          <div className="bg-indigo-600 text-white p-2.5 rounded-xl">
            <FaBagShopping size={22} />
          </div>

          <span className="text-2xl font-extrabold text-slate-900">
            Shop<span className="text-indigo-600">ora</span>
          </span>
        </Link>

        {/* 404 Illustration */}
        <div className="relative mb-8">

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="relative">
            <h1 className="text-[130px] sm:text-[190px] font-black leading-none tracking-tighter text-indigo-600">
              404
            </h1>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl rounded-2xl p-5 border border-slate-100">
              <FaMagnifyingGlass className="text-indigo-600 text-4xl" />
            </div>
          </div>

        </div>

        {/* Content */}
        <div className="relative space-y-4">

          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900">
            Oops! Page Not Found
          </h2>

          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            The page you're looking for might have been removed,
            had its name changed, or is temporarily unavailable.
          </p>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            <FaHouse />
            Back to Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition"
          >
            <FaArrowLeft />
            Go Back
          </button>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Shopora. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}

export default NotFound