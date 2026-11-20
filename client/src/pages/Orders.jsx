import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCalendarAlt,
  FaReceipt,
  FaTruck,
} from "react-icons/fa";

import { getMyOrders } from "../services/order";
import { useSelector } from "react-redux";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch logged-in user's orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getMyOrders();

      setOrders(res.orders || res.data || []);
    } catch (err) {
      console.error("Fetch orders error:", err);

      setError(
        err.response?.data?.message || "Unable to fetch your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Currency formatter
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price || 0);

  // Date formatter
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  // Status colors
  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-yellow-50 text-yellow-700",
      confirmed: "bg-blue-50 text-blue-700",
      processing: "bg-indigo-50 text-indigo-700",
      shipped: "bg-purple-50 text-purple-700",
      delivered: "bg-green-50 text-green-700",
      cancelled: "bg-red-50 text-red-700",
    };

    return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-600";
  };

  const getPaymentStyle = (status) => {
    const styles = {
      paid: "bg-green-50 text-green-700",
      pending: "bg-yellow-50 text-yellow-700",
      failed: "bg-red-50 text-red-700",
    };

    return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-600";
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <p className="font-semibold text-red-600">{error}</p>

        <button
          onClick={fetchOrders}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <span>Shopora</span>
            <span>/</span>
            <span className="font-semibold text-blue-600">My Orders</span>
          </div>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                My Orders
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Track and view all your purchased products.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <FaShoppingBag className="text-blue-600" />

              <span className="text-sm font-semibold text-gray-700">
                {orders.length} Orders
              </span>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-5 py-16 text-center shadow-sm">

            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-blue-50">
              <FaBoxOpen className="text-4xl text-blue-500" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900">
              No Orders Yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              You haven't placed any orders yet. Your purchases will appear here.
            </p>

          </div>
        ) : (

          /* ORDERS LIST */
          <div className="space-y-6">

            {orders.map((order) => {
              const orderItems = order.orderItems || order.items || [];

              const address = order.shippingAddress || {};

              return (
                <div
                  key={order._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >

                  {/* ORDER HEADER */}
                  <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                          Order ID
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-800">
                          #{order._id?.slice(-8).toUpperCase()}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                          Order Date
                        </p>

                        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <FaCalendarAlt className="text-gray-400" />
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                          Total Amount
                        </p>

                        <p className="mt-1 text-sm font-bold text-blue-600">
                          {formatPrice(order.totalPrice)}
                        </p>
                      </div>

                    </div>

                    <div className="flex flex-wrap items-center gap-2">

                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(order.orderStatus)}`}
                      >
                        {order.orderStatus || "Pending"}
                      </span>

                    </div>

                  </div>

                  {/* ORDER PRODUCTS */}
                  <div className="p-5 sm:p-7">

                    <div className="mb-5 flex items-center gap-2">
                      <FaShoppingBag className="text-blue-600" />

                      <h3 className="font-bold text-gray-800">
                        Ordered Products
                      </h3>
                    </div>

                    <div className="space-y-5">

                      {orderItems.map((item, index) => {
                        const product = item.productId;

                        const productName =
                          item.name || product?.name || "Product";

                        const productImage =
                          item.image || product?.image;

                        return (
                          <div
                            key={product?._id || index}
                            className="flex items-center gap-4"
                          >

                            <img
                              src={productImage}
                              alt={productName}
                              className="size-20 shrink-0 rounded-xl border border-gray-100 bg-gray-50 object-cover"
                            />

                            <div className="min-w-0 flex-1">

                              <h4 className="line-clamp-2 text-sm font-bold text-gray-800">
                                {productName}
                              </h4>

                              <p className="mt-2 text-xs text-gray-500">
                                Quantity: {item.quantity}
                              </p>

                              <p className="mt-1 text-sm font-bold text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </p>

                            </div>

                          </div>
                        );
                      })}

                    </div>

                  </div>

                  {/* ORDER DETAILS */}
                  <div className="grid grid-cols-1 gap-6 border-t border-gray-100 bg-gray-50/50 p-5 sm:grid-cols-2 sm:p-7">

                    {/* DELIVERY ADDRESS */}
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600" />

                        <h3 className="text-sm font-bold text-gray-800">
                          Delivery Address
                        </h3>
                      </div>

                      <div className="text-sm leading-6 text-gray-500">
                        <p className="font-semibold text-gray-800">
                          {address.name}
                        </p>

                        <p>{address.street}</p>

                        <p>
                          {address.city}, {address.state} - {address.pincode}
                        </p>

                        <p>{address.country}</p>

                        <p className="mt-1">
                          Phone: {address.phone}
                        </p>
                      </div>
                    </div>

                    {/* PAYMENT DETAILS */}
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <FaCreditCard className="text-blue-600" />

                        <h3 className="text-sm font-bold text-gray-800">
                          Payment Information
                        </h3>
                      </div>

                      <div className="space-y-2 text-sm">

                        <div className="flex justify-between gap-2">
                          <span className="text-gray-500">
                            Payment Method
                          </span>

                          <span className="font-semibold capitalize text-gray-800">
                            {order.paymentInfo?.method || "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between gap-2">
                          <span className="text-gray-500">
                            Payment Status
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${getPaymentStyle(order.paymentInfo?.status)}`}
                          >
                            {order.paymentInfo?.status || "Pending"}
                          </span>
                        </div>

                        <div className="flex justify-between gap-2">
                          <span className="text-gray-500">
                            Shipping Charges
                          </span>

                          <span className="font-semibold text-gray-800">
                            {formatPrice(order.shippingPrice)}
                          </span>
                        </div>

                        <div className="flex justify-between gap-2 border-t border-gray-200 pt-3">
                          <span className="font-bold text-gray-800">
                            Order Total
                          </span>

                          <span className="font-extrabold text-blue-600">
                            {formatPrice(order.totalPrice)}
                          </span>
                        </div>

                      </div>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;
