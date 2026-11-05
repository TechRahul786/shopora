import React from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
const UserReviewCard = () => {
  return (
    <div className="flex gap-2 w-[400px] rounded-2xl shadow-md mb-4 p-4">
      <div>
        <img
          src="https://images.pexels.com/photos/18178906/pexels-photo-18178906.jpeg?cs=srgb&dl=pexels-atahandemir-18178906.jpg&fm=jpg"
          alt=""
          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-300 ring-4 ring-slate-50 dark:ring-slate-800"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between w-full">
        <p>Sarah J.</p>
        <div className="flex gap-1">
          <FaStar className="text-amber-600 size-3" />
          <FaStar className="text-amber-600 size-3" />
          <FaStar className="text-amber-600 size-3" />
          <FaStar className="text-amber-600 size-3" />
          <FaStarHalfStroke className="text-amber-600 size-3" />
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
          inventore nulla culpa,
        </p>
      </div>
    </div>
  );
};

export default UserReviewCard;
