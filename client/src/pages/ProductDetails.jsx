import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import {
  FaStar,
  FaStarHalfAlt,
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaMinus,
  FaPlus,
  FaCheck,
} from "react-icons/fa";
import { addToCart } from "../services/cart";

const ProductDetails = () => {
    const navigate = useNavigate()
    const [quantity,setQuantity] = useState(1)
    const id = useParams().id
    const product = useSelector((state)=>(state.data.products))
    const filterProduct = product.filter(data=>(
        data._id.includes(id)
    ))
    const addQty = () =>{
        if(quantity<12){
                 setQuantity(quantity+1)
        }
    }
    const minusQty = () =>{
        if(quantity>1){
                 setQuantity(quantity-1)
        }
    }

    const cratHandle = async () =>{
      const res = await addToCart(id,quantity)
      navigate('/cart')
    }
    
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Product Details */}
        <div className="grid grid-cols-1 gap-10 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">

          {/* Product Image */}
          <div className="flex items-center justify-center rounded-xl bg-gray-100 p-6">
            <img
              src={filterProduct[0].image}
              alt="Wireless Headphones"
              className="h-[350px] w-full object-contain sm:h-[450px]"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col">

            <span className="mb-3 w-fit rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-600">
              {filterProduct[0].category}
            </span>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {filterProduct[0].name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>

              <span className="text-sm font-medium text-gray-700">
                {filterProduct[0].ratings}
              </span>

              <span className="text-sm text-gray-400">
                ({filterProduct[0].numReviews})
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold text-gray-900">
                ₹{filterProduct[0].price}
              </h2>

              <span className="text-lg text-gray-400 line-through">
                ₹3,999
              </span>

              <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                38% OFF
              </span>
            </div>

            <p className="mt-5 leading-7 text-gray-600">
             {filterProduct[0].description}
            </p>

            {/* Availability */}
            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-green-600">
                <FaCheck />
               {filterProduct[0].stock>0?("In Stock"):("Out Stock")}
              
            </div>


            {/* Quantity */}
            <div className="mt-7">
              <h3 className="mb-3 font-semibold text-gray-900">
                Quantity
              </h3>

              <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-200">
                <button className="p-3 text-gray-600 hover:bg-gray-100" onClick={minusQty}>
                  <FaMinus size={12} />
                </button>

                <span className="min-w-12 text-center font-semibold">
                  {quantity}
                </span>

                <button className="p-3 text-gray-600 hover:bg-gray-100" onClick={addQty}>
                  <FaPlus size={12} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

              <button onClick={cratHandle} className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-700">
                <FaShoppingCart />
                Add to Cart
              </button>

              <button className="flex items-center justify-center gap-2 rounded-lg border border-indigo-600 px-6 py-4 font-semibold text-indigo-600 transition hover:bg-indigo-50">
                <FaBolt />
                Buy Now
              </button>

            </div>

            {/* Wishlist */}
            <button className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 font-medium text-gray-600 transition hover:border-red-300 hover:text-red-500">
              <FaHeart />
              Add to Wishlist
            </button>

            {/* Services */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">

              <div className="flex items-center gap-3">
                <FaTruck className="text-2xl text-indigo-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Free Delivery
                  </p>
                  <p className="text-xs text-gray-500">
                    On eligible orders
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-2xl text-indigo-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Secure Payment
                  </p>
                  <p className="text-xs text-gray-500">
                    100% Protected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaUndo className="text-2xl text-indigo-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-500">
                    7 Days Return
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>


      </div>
    </div>
  );
}

export default ProductDetails