import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaGrip,
} from "react-icons/fa6";

const Category = ({ categories = [] }) => {
  const sliderRef = useRef(null);

  const pastelColors = [
    "bg-sky-100",
    "bg-rose-100",
    "bg-amber-100",
    "bg-pink-100",
    "bg-cyan-100",
    "bg-orange-100",
    "bg-purple-100",
    "bg-indigo-100",
  ];

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "next" ? 350 : -350,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white px-3 py-6 sm:px-6 rounded-xl">
      <div className="relative mx-auto max-w-7xl">

        {/* Previous Button */}
        <button
          onClick={() => scrollSlider("prev")}
          aria-label="Previous categories"
          className="absolute -left-3 top-8 z-10 hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition hover:bg-blue-600 hover:text-white md:flex"
        >
          <FaChevronLeft size={13} />
        </button>

        {/* Category Slider */}
        <div
          ref={sliderRef}
          className="flex items-start gap-5 overflow-x-auto scroll-smooth px-2 pb-2 sm:justify-between sm:gap-4 md:px-7 scrollbar-hide"
        >
          {categories.map((category, index) => {
            const image =
              typeof category.image === "string"
                ? category.image
                : category.image?.secure_url || category.image?.url;

            return (
              <Link
                key={category._id}
                to={`/category/${category._id}`}
                className="group flex w-[85px] shrink-0 flex-col items-center text-center sm:w-[95px]"
              >
                {/* Circular Icon */}
                <div
                  className={`flex h-[68px] w-[68px] items-center justify-center rounded-full border-[3px] border-white shadow-sm ring-1 ring-gray-100 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-md sm:h-[76px] sm:w-[76px] ${
                    pastelColors[index % pastelColors.length]
                  }`}
                >
                  <img
                    src={image}
                    alt={category.name}
                    loading="lazy"
                    className="h-11 w-11 object-contain transition duration-300 group-hover:scale-110 sm:h-12 sm:w-12"
                  />
                </div>

                {/* Category Name */}
                <span className="mt-2.5 w-full break-words text-xs font-semibold leading-4 text-gray-800 transition group-hover:text-blue-600 sm:text-sm">
                  {category.name}
                </span>
              </Link>
            );
          })}

          {/* View All */}
          <Link
            to="/categories"
            className="group flex w-[85px] shrink-0 flex-col items-center text-center sm:w-[95px]"
          >
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-[3px] border-white bg-gray-50 shadow-sm ring-1 ring-gray-100 transition duration-300 group-hover:-translate-y-1 group-hover:bg-blue-50 group-hover:shadow-md sm:h-[76px] sm:w-[76px]">
              <FaGrip className="text-2xl text-gray-700 transition group-hover:text-blue-600" />
            </div>

            <span className="mt-2.5 text-xs font-semibold text-gray-800 transition group-hover:text-blue-600 sm:text-sm">
              View All
            </span>
          </Link>
        </div>

        {/* Next Button */}
        <button
          onClick={() => scrollSlider("next")}
          aria-label="Next categories"
          className="absolute -right-3 top-8 z-10 hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition hover:bg-blue-600 hover:text-white md:flex"
        >
          <FaChevronRight size={13} />
        </button>

      </div>
    </section>
  );
};

export default Category;