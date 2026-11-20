import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle, FaShoppingBag, FaBoxOpen, FaArrowRight } from "react-icons/fa";

const OrderSuccess = () => {
  const location = useLocation();
  const orderData = location.state?.order || null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        
        {/* Success Icon Animation */}
        <div className="flex justify-center mb-6">
          <div className="size-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center animate-bounce">
            <FaCheckCircle size={48} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Thank you for your purchase. We are getting your order ready for shipment.
        </p>

        {/* Order Meta Info (if passed via state) */}
        {orderData && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left border border-gray-100 text-sm space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Order ID:</span>
              <span className="font-mono font-medium text-gray-900">{orderData._id || "N/A"}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Payment Method:</span>
              <span className="font-medium text-gray-900 uppercase">{orderData.paymentInfo?.method}</span>
            </div>
            <div className="flex justify-between text-gray-600 border-t border-gray-200 pt-2 mt-2">
              <span className="font-semibold text-gray-900">Total Paid:</span>
              <span className="font-bold text-blue-600">₹{orderData.totalPrice}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/orders"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition shadow-sm"
          >
            <FaBoxOpen /> View My Orders
          </Link>

          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-xl transition"
          >
            <FaShoppingBag /> Continue Shopping <FaArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;