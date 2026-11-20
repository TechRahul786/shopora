import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaShieldAlt,
  FaShoppingBag,
  FaTruck,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowRight,
  FaBoxOpen,
} from "react-icons/fa";

import { addOrder } from "../services/order";
import { clearCart } from "../services/cart";
import { useNavigate } from "react-router-dom";
import { createStripeSession } from "../services/payment";

const Checkout = () => {
    const navigate = useNavigate()
  const cart = useSelector((state) => state.cart);

  const items = cart?.items || [];

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pin: "",
    country: "India",
    phone: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm((prev) => ({
        ...prev,
        phone: value.replace(/\D/g, "").slice(0, 10),
      }));
    } else if (name === "pin") {
      setForm((prev) => ({
        ...prev,
        pin: value.replace(/\D/g, "").slice(0, 6),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setError("");
    setSuccess("");
  };

  // Calculate prices
  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.product.price) * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  // Currency formatter
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price);

  // Input styling
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  // Place order
  const handlePlaceOrder = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!items.length) {
    setError("Your cart is empty.");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(form.phone)) {
    setError("Please enter a valid 10-digit mobile number.");
    return;
  }

  if (!/^\d{6}$/.test(form.pin)) {
    setError("Please enter a valid 6-digit PIN code.");
    return;
  }

  setIsSubmitting(true);

  try {
    const formattedOrderItems = items.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      image: item.product.image,
    }));

    const formattedShippingAddress = {
      name: form.name.trim(),
      street: form.street.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pin,
      country: form.country.trim(),
      phone: form.phone,
    };

    const newOrderPayload = {
      orderItems: formattedOrderItems,
      shippingAddress: formattedShippingAddress,
      paymentInfo: {
        id: "pending",
        method: paymentMethod,
      },
      itemsPrice: subtotal,
      taxPrice: 0,
      shippingPrice: shipping,
      totalPrice: total,
    };

    const res = await addOrder(newOrderPayload);

    if (res?.success === false) {
      throw new Error(res.message || "Unable to place order.");
    }

    if (paymentMethod === "online") {
      
      const stripeRes = await createStripeSession({
        items: formattedOrderItems,
        shippingPrice: shipping,
        orderId: res.data?._id,
      });

      if (!stripeRes?.url) {
        throw new Error("Unable to start Stripe checkout session.");
      }

      // Redirect browser to Stripe hosted checkout page
      window.location.href = stripeRes.url;
      return;
    }

    // Cash on Delivery flow
    await clearCart();
    setSuccess("Your order has been placed successfully!");
    navigate("/order-success", { state: { order: res.data } });
  } catch (error) {
    console.error("Order error:", error);

    setError(
      error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-8 sm:py-12">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <span>Shopora</span>
            <span>/</span>
            <span>Cart</span>
            <span>/</span>
            <span className="font-semibold text-blue-600">
              Checkout
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Checkout
              </h1>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Complete your purchase with a few simple steps.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <FaShieldAlt />
              Secure Checkout
            </div>
          </div>
        </div>

        {/* CHECKOUT FORM */}
        <form onSubmit={handlePlaceOrder}>

          <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12">

            {/* LEFT CONTENT */}
            <div className="space-y-6 lg:col-span-7">

              {/* DELIVERY ADDRESS */}
              <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-5 sm:px-7">

                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Delivery Address
                    </h2>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      Enter your details for successful delivery.
                    </p>
                  </div>

                  <span className="ml-auto hidden rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 sm:block">
                    Step 01
                  </span>

                </div>

                <div className="p-5 sm:p-7">

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800">
                      Contact Information
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">
                      Required fields are marked with *
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {/* FULL NAME */}
                    <div className="sm:col-span-2">
                      <label htmlFor="name" className={labelClass}>
                        Full Name <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        minLength={3}
                        maxLength={60}
                        pattern="[A-Za-z ]+"
                        title="Enter a valid name using letters and spaces."
                        className={inputClass}
                        required
                      />
                    </div>

                    {/* PHONE */}
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Mobile Number <span className="text-red-500">*</span>
                      </label>

                      <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">

                        <span className="flex items-center border-r border-gray-200 px-3 text-sm font-semibold text-gray-600">
                          +91
                        </span>

                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="9876543210"
                          value={form.phone}
                          onChange={handleChange}
                          autoComplete="tel-national"
                          className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                          pattern="[6-9][0-9]{9}"
                          title="Enter a valid 10-digit Indian mobile number."
                          required
                        />

                      </div>
                    </div>

                    {/* COUNTRY */}
                    <div>
                      <label htmlFor="country" className={labelClass}>
                        Country <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        id="country"
                        name="country"
                        placeholder="Country"
                        value={form.country}
                        onChange={handleChange}
                        autoComplete="country-name"
                        className={inputClass}
                        required
                      />
                    </div>

                  </div>

                  <div className="my-7 border-t border-gray-100" />

                  <div className="mb-5">
                    <h3 className="font-semibold text-gray-800">
                      Address Details
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      Where would you like your order delivered?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {/* STREET */}
                    <div className="sm:col-span-2">
                      <label htmlFor="street" className={labelClass}>
                        Street Address / House No.{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        id="street"
                        name="street"
                        placeholder="House no., building, street, area"
                        value={form.street}
                        onChange={handleChange}
                        autoComplete="street-address"
                        minLength={5}
                        maxLength={150}
                        className={inputClass}
                        required
                      />
                    </div>

                    {/* CITY */}
                    <div>
                      <label htmlFor="city" className={labelClass}>
                        City <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter city"
                        value={form.city}
                        onChange={handleChange}
                        autoComplete="address-level2"
                        className={inputClass}
                        required
                      />
                    </div>

                    {/* STATE */}
                    <div>
                      <label htmlFor="state" className={labelClass}>
                        State <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="Enter state"
                        value={form.state}
                        onChange={handleChange}
                        autoComplete="address-level1"
                        className={inputClass}
                        required
                      />
                    </div>

                    {/* PIN CODE */}
                    <div className="sm:col-span-2">
                      <label htmlFor="pin" className={labelClass}>
                        PIN Code <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        id="pin"
                        name="pin"
                        placeholder="Enter 6-digit PIN code"
                        value={form.pin}
                        onChange={handleChange}
                        autoComplete="postal-code"
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        className={inputClass}
                        required
                      />
                    </div>

                  </div>
                </div>
              </section>

              {/* PAYMENT METHOD */}
              <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-5 sm:px-7">

                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-xl text-purple-600">
                    <FaCreditCard />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Payment Method
                    </h2>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      Choose how you want to pay.
                    </p>
                  </div>

                  <span className="ml-auto hidden rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 sm:block">
                    Step 02
                  </span>

                </div>

                <div className="space-y-4 p-5 sm:p-7">

                  {/* ONLINE PAYMENT */}
                  <label
                    className={`relative flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 sm:p-5 ${
                      paymentMethod === "online"
                        ? "border-blue-600 bg-blue-50/60"
                        : "border-gray-100 hover:border-gray-300"
                    }`}
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="size-4 accent-blue-600"
                    />

                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-blue-600 shadow-sm">
                      <FaCreditCard />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-900">
                        Online Payment
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-gray-500">
                        UPI, Credit Card, Debit Card and Net Banking.
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold text-gray-500">
                        <span className="rounded bg-white px-2 py-1">UPI</span>
                        <span className="rounded bg-white px-2 py-1">VISA</span>
                        <span className="rounded bg-white px-2 py-1">RuPay</span>
                      </div>
                    </div>

                    {paymentMethod === "online" && (
                      <FaCheckCircle className="shrink-0 text-xl text-blue-600" />
                    )}

                  </label>

                  {/* COD */}
                  <label
                    className={`relative flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 sm:p-5 ${
                      paymentMethod === "cod"
                        ? "border-blue-600 bg-blue-50/60"
                        : "border-gray-100 hover:border-gray-300"
                    }`}
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="size-4 accent-blue-600"
                    />

                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-green-600 shadow-sm">
                      <FaMoneyBillWave />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-900">
                        Cash on Delivery
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-gray-500">
                        Pay with cash when your order arrives at your doorstep.
                      </p>
                    </div>

                    {paymentMethod === "cod" && (
                      <FaCheckCircle className="shrink-0 text-xl text-blue-600" />
                    )}

                  </label>

                </div>
              </section>

              {/* ERROR / SUCCESS */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700"
                >
                  {success}
                </div>
              )}

            </div>

            {/* RIGHT SECTION - ORDER SUMMARY */}
            <div className="lg:sticky lg:top-24 lg:col-span-5">

              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">

                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-orange-50 text-lg text-orange-500">
                      <FaShoppingBag />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Order Summary
                      </h2>

                      <p className="text-xs text-gray-500">
                        Review your items
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                    {items.length} Items
                  </span>

                </div>

                {/* PRODUCT LIST */}
                <div className="max-h-[380px] space-y-5 overflow-y-auto p-5 sm:p-6">

                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <div
                        key={item.product._id || item.product.id || index}
                        className="flex gap-4"
                      >

                        <div className="relative shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="size-20 rounded-xl border border-gray-100 bg-gray-50 object-cover"
                          />

                          <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-800">
                            {item.product.name}
                          </h3>

                          <p className="mt-2 text-xs text-gray-400">
                            Qty: {item.quantity}
                          </p>

                          <p className="mt-2 text-sm font-bold text-gray-900">
                            {formatPrice(
                              item.product.price * item.quantity
                            )}
                          </p>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center">
                      <FaBoxOpen className="mx-auto text-4xl text-gray-300" />

                      <p className="mt-3 text-sm font-semibold text-gray-700">
                        Your cart is empty
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Add some products to continue.
                      </p>
                    </div>
                  )}

                </div>

                {/* PRICE DETAILS */}
                <div className="border-t border-gray-100 bg-gray-50/70 p-5 sm:p-6">

                  <h3 className="mb-5 font-bold text-gray-900">
                    Price Details
                  </h3>

                  <div className="space-y-4">

                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-800">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Shipping Charges</span>

                      <span className="font-semibold text-gray-800">
                        {shipping === 0 ? "—" : formatPrice(shipping)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Tax</span>
                      <span className="font-semibold text-gray-800">
                        {formatPrice(0)}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-gray-200 pt-5">

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-base font-bold text-gray-900">
                            Total Amount
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Inclusive of all charges
                          </p>
                        </div>

                        <p className="text-2xl font-extrabold text-blue-600">
                          {formatPrice(total)}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* PLACE ORDER BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Processing Order...
                      </>
                    ) : (
                      <>
                        {paymentMethod === "online"
                          ? "Continue to Payment"
                          : "Place Order"}

                        <FaArrowRight />
                      </>
                    )}
                  </button>

                  {/* SECURITY */}
                  <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <FaShieldAlt className="text-green-600" />
                    Your information is safe and secure.
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2 border-t border-gray-200 pt-4 text-xs text-gray-400">
                    <FaTruck className="text-blue-500" />
                    Fast & reliable delivery
                  </div>

                </div>

              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Checkout;