import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRightLong,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";

import ProductCard from "./common/ProductCard";

const ProductSlider = ({ products = [] }) => {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth * 0.8;

    sliderRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="rounded-xl bg-white px-4 py-6 sm:px-6">

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
              Top Picks for You
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Discover products you might like
            </p>
          </div>

          <Link
            to="/products"
            className="flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
          >
            See All Products
            <FaArrowRightLong />
          </Link>
        </div>

        {/* Slider Wrapper */}
        <div className="relative">

          {/* Previous Button */}
          <button
            type="button"
            onClick={() => scrollSlider("prev")}
            aria-label="Previous products"
            className="absolute -left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg transition hover:bg-blue-600 hover:text-white md:flex"
          >
            <FaChevronLeft />
          </button>

          {/* Product Slider */}
          <div
            ref={sliderRef}
            className="flex w-full gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {Array.from({ length: 10 }).map((_,index) => (
              <div
                // key={product._id}
                className="w-[200px] shrink-0 snap-start sm:w-[220px] lg:w-[230px]"
              >
                <ProductCard  />
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => scrollSlider("next")}
            aria-label="Next products"
            className="absolute -right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg transition hover:bg-blue-600 hover:text-white md:flex"
          >
            <FaChevronRight />
          </button>

        </div>
      </div>
    </section>
  );
};

export default ProductSlider;