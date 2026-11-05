import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiHeart,
  FiArrowLeft,
} from "react-icons/fi";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">

      {/* Left Branding Section */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">

        {/* Background Decoration */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />

        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-700 shadow-lg">
            <FiShoppingBag size={25} />
          </div>
          <span className="text-2xl font-bold tracking-wide">
            Shopora
          </span>
        </Link>

        {/* Main Content */}
        <div className="relative z-10 my-12 max-w-xl">
          <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            Your shopping journey starts here
          </span>

          <h1 className="text-4xl font-extrabold leading-tight xl:text-5xl">
            Discover products.
            <br />
            Enjoy better shopping.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
            Explore your favourite products, enjoy a seamless shopping
            experience, and get everything you need in one place.
          </p>

          {/* Features */}
          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <FiTruck size={21} />
              </div>
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-indigo-200">
                  Get your products delivered to your doorstep.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <FiShield size={21} />
              </div>
              <div>
                <h3 className="font-semibold">Secure Shopping</h3>
                <p className="text-sm text-indigo-200">
                  Shop confidently with a secure experience.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <FiHeart size={21} />
              </div>
              <div>
                <h3 className="font-semibold">Your Favourite Products</h3>
                <p className="text-sm text-indigo-200">
                  Find products you'll love.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-indigo-200">
          © {new Date().getFullYear()} Shopora. All rights reserved.
        </div>
      </div>

      {/* Right Authentication Section */}
      <div className="flex min-h-screen flex-col">

        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <FiShoppingBag size={22} />
            </div>
            <span className="text-xl font-bold text-slate-800">
              Shopora
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
          >
            <FiArrowLeft />
            Home
          </Link>
        </div>

        {/* Form Area */}
        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">

            {/* Desktop Back Button */}
            <Link
              to="/"
              className="mb-8 hidden items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 lg:inline-flex"
            >
              <FiArrowLeft size={17} />
              Back to home
            </Link>

            <Outlet />

            {/* Bottom Footer */}
            <p className="mt-10 text-center text-xs text-slate-400">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;