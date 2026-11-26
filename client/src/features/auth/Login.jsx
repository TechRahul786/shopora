import React, { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { setUser } from "../store/slice/authSclice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    finalsubmit: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // User jab type kare toh error clear kar dein
    setError((prev) => ({
      ...prev,
      [name]: "",
      finalsubmit: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setError({
      email: "",
      password: "",
      finalsubmit: "",
    });

    // Form validation
    let newErrors = {
      email: "",
      password: "",
      finalsubmit: "",
    };

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    // Stop submission if validation fails
    if (newErrors.email || newErrors.password) {
      setError(newErrors);
      return;
    }

    try {
      setLoading(true);
      setSubmitted(false);

      const res = await login(form);

      if (!res.success) {
        setError((prev) => ({
          ...prev,
          finalsubmit: res.message || "Invalid email or password",
        }));
        return;
      }

      // Login successful
      dispatch(setUser(res.user));

      setSubmitted(true);

      setForm({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);

      setError((prev) => ({
        ...prev,
        finalsubmit:
          err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white/95 backdrop-blur-md w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Please enter your details to sign in
          </p>
        </div>

        {/* Success / Error Banners */}
        {error.finalsubmit && (
          <div
            role="alert"
            className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-xl text-center font-medium"
          >
            {error.finalsubmit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <div className="relative flex items-center">
              <FiMail className="absolute left-4 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={form.email}
                onChange={changeHandle}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
            {error.email && (
              <span className="text-xs text-rose-500 mt-1 ml-1 block">
                {error.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative flex items-center">
              <FiLock className="absolute left-4 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={changeHandle}
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <FiEyeOff className="text-lg" />
                ) : (
                  <FiEye className="text-lg" />
                )}
              </button>
            </div>
            {error.password && (
              <span className="text-xs text-rose-500 mt-1 ml-1 block">
                {error.password}
              </span>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a
              href="#forgot"
              className="text-xs text-indigo-600 hover:underline font-medium"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-3.5 px-4 text-white font-semibold rounded-xl shadow-lg transition-all duration-200
    ${
      loading
        ? "bg-indigo-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer active:scale-[0.98]"
    }`}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer / Switch to Register */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
