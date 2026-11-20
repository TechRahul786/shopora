import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCart, removeFromCart, updateCartItemQuantity } from "../services/cart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate()
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Cart on mount
  const fetchCart = async () => {
    try {
      setLoading(true);
      // Adjust endpoint based on your API setup (include withCredentials if using cookies)
      const res = await getCart()
      setCart(res.data.cart);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load cart");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update Item Quantity
  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const res = await updateCartItemQuantity(productId,newQuantity)
      setCart(res.data.cart);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update quantity");
    }
  };

  // Remove Item
  const handleRemoveItem = async (productId) => {
    try {
      const res = await removeFromCart(productId)
      setCart(res.data.cart);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove item");
    }
  };

  // Calculate Subtotal safely
  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-medium">
        Error: {error}
      </div>
    );
  }

  // Empty Cart State
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <a
          href="/products"
          className="inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.items.map((item) => {
            const product = item.product;
            // Fallback if product was deleted from DB
            if (!product) return null;

            return (
              <div
                key={product._id}
                className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100"
              >
                {/* Product Image & Details */}
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {product.name}
                    </h3>
                    <p className="text-indigo-600 font-bold mt-1">
                      ${product.price?.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(product._id, item.quantity - 1)
                      }
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-medium text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(product._id, item.quantity + 1)
                      }
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(product._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {navigate('/checkout')}}
              className="w-full bg-indigo-600 text-white font-medium py-3 rounded-xl shadow hover:bg-indigo-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}