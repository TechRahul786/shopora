import React from "react";
import {
  FaBookmark,
  FaRegCircleUser,
  FaOpencart,
  FaMagnifyingGlass,
  FaBagShopping,
  FaBars,
  FaXmark
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = ({mobileNav,setMobileNav}) => {
    const toggleMobileNav = () =>{
        setMobileNav(!mobileNav)
    }
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
            <FaBagShopping className="text-xl" />
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-gray-800">
            Shop<span className="text-blue-600">ora</span>
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden flex-1 justify-center px-6 md:flex">
          <div className="flex w-full max-w-xl items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">

            <FaMagnifyingGlass className="ml-4 shrink-0 text-gray-400" />

            <input
              type="text"
              placeholder="Search products, brands and more..."
              className="w-full bg-transparent px-3 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />

            <button
              type="button"
              className="flex h-full items-center justify-center bg-blue-600 px-5 text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-5">

          {/* Account */}
          <Link
            to="/profile"
            className="group flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 sm:flex-row sm:gap-2 sm:px-3"
          >
            <FaRegCircleUser className="text-xl" />
            <span className="hidden text-sm font-medium sm:block">
              Account
            </span>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="group flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 sm:flex-row sm:gap-2 sm:px-3"
          >
            <FaBookmark className="text-xl" />
            <span className="hidden text-sm font-medium sm:block">
              Wishlist
            </span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="group relative flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 sm:flex-row sm:gap-2 sm:px-3"
          >
            <FaOpencart className="text-xl" />
            <span className="hidden text-sm font-medium sm:block">
              Cart
            </span>

            {/* Cart Count */}
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white sm:-right-1">
              2
            </span>
          </Link>

          {/* Mobile Menu Button */}
          
          {mobileNav?(<button
            type="button"
            onClick={toggleMobileNav}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 md:hidden"
          >
            <FaXmark className="text-xl" />
          </button>):(<button
            type="button"
            onClick={toggleMobileNav}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 md:hidden"
          >
            <FaBars className="text-xl" />
          </button>)}
          

        </div>
      </div>

      {/* Search Bar - Mobile */}
      <div className="px-4 pb-4 md:hidden">
        <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

          <FaMagnifyingGlass className="ml-3 shrink-0 text-gray-400" />

          <input
            type="text"
            placeholder="Search products and brands..."
            className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-gray-400"
          />

          <button
            type="button"
            className="bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700"
          >
            <FaMagnifyingGlass />
          </button>
        </div>
      </div>

    </header>
  );
};

export default Header;