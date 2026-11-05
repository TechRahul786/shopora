import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaAngleDown, FaArrowRight } from "react-icons/fa6";

const Navigation = ({ mobileNav, categories = [] }) => {
  // Display only first 7 categories
  const visibleCategories = categories.slice(0, 7);

  return (
    <nav className="relative z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Desktop Navigation */}
        <div className="hidden min-h-14 items-center justify-between gap-4 md:flex">

          <div className="flex flex-1 flex-wrap items-center gap-x-7 gap-y-2 py-3">
            {visibleCategories.map((category) => (
              <NavLink
                key={category._id}
                to={`/category/${category._id}`}
                className={({ isActive }) =>
                  `max-w-36 break-words text-sm font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
                title={category.name}
              >
                {category.name}
              </NavLink>
            ))}
          </div>

          {/* View More */}
          {categories.length > 7 && (
            <Link
              to="/categories"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              View More
              <FaArrowRight className="text-xs" />
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            mobileNav ? "max-h-[500px] py-4" : "max-h-0"
          }`}
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

            {visibleCategories.map((category) => (
              <NavLink
                key={category._id}
                to={`/category/${category._id}`}
                className={({ isActive }) =>
                  `flex min-h-12 items-center rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "border-blue-200 bg-blue-50 text-blue-600"
                      : "border-gray-100 bg-gray-50 text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                <span className="break-words">
                  {category.name}
                </span>
              </NavLink>
            ))}

          </div>

          {/* Mobile View More */}
          {categories.length > 7 && (
            <Link
              to="/categories"
              className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View All Categories
              <FaArrowRight />
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navigation;