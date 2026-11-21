import React from "react";
import {
  FaCartShopping,
  FaStar,
  FaRegHeart,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item, onAddToCart }) => {
  const navigate = useNavigate();

  const clickHandle = (id) => {
    navigate(`/product-details/${id}`);
  };

  const isOutOfStock = item.stock <= 0;

  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">

      {/* Product Image */}
      <div className="relative bg-gray-50 overflow-hidden">

        <img
          src={item.image}
          alt={item.name}
          onClick={() => clickHandle(item._id)}
          className="w-full h-48 sm:h-52 object-contain p-4 cursor-pointer group-hover:scale-110 transition-transform duration-500"
        />

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 bg-white shadow-sm p-2 rounded-full hover:text-red-500 transition"
          aria-label="Add to wishlist"
        >
          <FaRegHeart />
        </button>

        {/* Stock Status */}
        {isOutOfStock && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Product Name */}
        <h3
          onClick={() => clickHandle(item._id)}
          className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 min-h-12 cursor-pointer hover:text-blue-600 transition"
        >
          {item.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-amber-500">
            <FaStar />
            <span className="text-sm font-semibold text-gray-700">
              {item.ratings || "0.0"}
            </span>
          </div>

          <span className="text-xs text-gray-400">
            ({item.numReviews || 0} reviews)
          </span>
        </div>

        {/* Price & Cart */}
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">

          <div>
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-lg font-bold text-gray-900">
              ₹{Number(item.price).toLocaleString("en-IN")}
            </p>
          </div>

          <button
            disabled={isOutOfStock}
            onClick={() => onAddToCart?.(item)}
            className="flex items-center gap-2 bg-green-800 text-white p-3 rounded-lg hover:bg-green-700 active:scale-95 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <FaCartShopping />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
