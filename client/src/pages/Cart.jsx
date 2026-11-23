import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowRight,
  FaBagShopping,
  FaArrowLeft,
  FaShieldHalved,
} from "react-icons/fa6";

import {
  getCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../services/cart";

import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Currency formatter
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price || 0);
  };

  // Fetch Cart
  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await getCart();

      setCart(res.data.cart);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load cart"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update Quantity
  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await updateCartItemQuantity(
        productId,
        newQuantity
      );

      setCart(res.data.cart);
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to update quantity"
      );
    }
  };

  // Remove Item
  const handleRemoveItem = async (productId) => {
    try {
      const res = await removeFromCart(productId);

      setCart(res.data.cart);
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to remove item"
      );
    }
  };

  // Calculate Subtotal
  const calculateTotal = () => {
    if (!cart?.items) return 0;

    return cart.items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const totalItems = cart?.items?.reduce(
    (total, item) => total + item.quantity,
    0
  ) || 0;

  // Loading
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center px-4 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          Unable to load cart
        </h2>

        <p className="text-red-500 mt-2">{error}</p>

        <button
          onClick={fetchCart}
          className="mt-5 px-6 py-3 bg-indigo-600 text-white rounded-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty Cart
  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="min-h-[75vh] bg-gray-50 flex items-center justify-center px-4">

        <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center">

          <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaBagShopping size={38} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-3 leading-relaxed">
            Looks like you haven't added anything to your cart yet.
            Explore our products and find something you love.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-3 mt-8 bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Start Shopping
            <FaArrowRight />
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Page Header */}
        <div className="mb-8">

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition mb-5"
          >
            <FaArrowLeft size={12} />
            Continue Shopping
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Shopping Cart
              </h1>

              <p className="text-gray-500 mt-2">
                Review your items before checkout.
              </p>
            </div>

            <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold w-fit">
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </div>

          </div>

        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Cart Products */}
          <div className="lg:col-span-8">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Your Items
              </h2>

              <span className="text-sm text-gray-400">
                {cart.items.length} Products
              </span>
            </div>

            <div className="space-y-4">

              {cart.items.map((item) => {

                const product = item.product;

                if (!product) return null;

                return (

                  <div
                    key={product._id}
                    className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition"
                  >

                    <div className="flex flex-col sm:flex-row gap-4">

                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-36 sm:h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0">

                        <img
                          src={
                            product.image ||
                            "https://placehold.co/300x300?text=Product"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        />

                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">

                        <div>

                          <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">
                            {product.name}
                          </h3>

                          <p className="text-indigo-600 font-bold text-lg mt-2">
                            {formatPrice(product.price)}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Price per item
                          </p>

                        </div>

                        {/* Quantity and Remove */}
                        <div className="flex items-center justify-between gap-3 mt-5">

                          {/* Quantity */}
                          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">

                            <button
                              disabled={item.quantity <= 1}
                              onClick={() =>
                                handleUpdateQuantity(
                                  product._id,
                                  item.quantity - 1
                                )
                              }
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition"
                            >
                              <FaMinus size={11} />
                            </button>

                            <span className="w-10 text-center font-semibold text-gray-800 text-sm">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  product._id,
                                  item.quantity + 1
                                )
                              }
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                            >
                              <FaPlus size={11} />
                            </button>

                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => handleRemoveItem(product._id)}
                            className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition"
                          >
                            <FaTrash size={12} />
                            Remove
                          </button>

                        </div>

                      </div>

                    </div>

                    {/* Item Total */}
                    <div className="border-t border-gray-100 mt-4 pt-3 flex justify-between items-center">

                      <span className="text-sm text-gray-500">
                        Item Total
                      </span>

                      <span className="font-bold text-gray-900">
                        {formatPrice(product.price * item.quantity)}
                      </span>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">

              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Price Details */}
              <div className="space-y-4">

                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal ({totalItems} items)</span>

                  <span className="font-semibold text-gray-800">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>

                  <span className="text-green-600 font-semibold">
                    FREE
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-5 flex justify-between items-center">

                  <span className="text-base font-bold text-gray-900">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-indigo-600">
                    {formatPrice(calculateTotal())}
                  </span>

                </div>

              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-7 flex items-center justify-center gap-3 bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition duration-300"
              >
                Proceed to Checkout
                <FaArrowRight />
              </button>

              {/* Security Info */}
              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                <FaShieldHalved className="text-green-500" />
                Secure checkout experience
              </div>

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="mt-5 flex items-center justify-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}