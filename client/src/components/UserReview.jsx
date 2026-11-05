import React, { useRef } from "react";
import {
  FaArrowRightLong,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaStar,
  FaStarHalfStroke
} from "react-icons/fa6";
import UserReviewCard from "./UserReviewCard";
const UserReview = () => {
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
        <div className="mb-6 md:flex md:items-center justify-between">
          <div className="flex gap-2 justify-center items-center">
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
              Loved By Thousands
            </h2>
            <FaHeart className="text-red-400 size-6"/>
          </div>

          <div className="flex gap-1 items-center justify-center">
            <p className="text-md font-semibold">4&5 Average Ratings</p>
            <div className="flex gap-1">
                <FaStar className="text-amber-500 size-3"/>
                <FaStar className="text-amber-500 size-3"/>
                <FaStar className="text-amber-500 size-3"/>
                <FaStar className="text-amber-500 size-3"/>
                <FaStarHalfStroke className="text-amber-500 size-3"/>
            </div>
          </div>
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
            className="flex w-full gap-4 overflow-x-auto scroll-smooth pb-1 scrollbar-none snap-x snap-mandatory"
          >
            {Array.from({ length: 10 }).map((_,index) => (
              <div
                // key={product._id}
                className="w-auto shrink-0 snap-start sm:w-auto lg:w-auto"
              >
               <UserReviewCard/>
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
  )
}

export default UserReview