import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { register } from "../../services/auth";

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conf_password: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conf_password: "",
    finalsubmit: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setSubmitted(false)
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
      finalsubmit: "",
    }));

    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      conf_password: "",
      finalsubmit: "",
    };
    let isValid = true;

    if (!form.firstName) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }
    if (!form.lastName) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }
    if (!form.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (!form.conf_password) {
      newErrors.conf_password = "Confirm password is required";
      isValid = false;
    } else if (form.password !== form.conf_password) {
      newErrors.finalsubmit = "Passwords do not match!";
      isValid = false;
    }

    setError(newErrors);

    if (isValid) {
      const res = await register(form);
      console.log(res);
      if (!res.success) {
         newErrors.finalsubmit = res.message
          setError(newErrors)
      }
       
        setSubmitted(true);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          conf_password: "",
        });
        setError({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          conf_password: "",
          finalsubmit: "",
        });

        navigate('/auth')
      
      console.log("Form Data:", form);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white/95 backdrop-blur-md w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Please fill in your details to register
          </p>
        </div>

        {/* Success / Error Banners */}
        {submitted && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl text-center font-medium">
            🎉 Form Submitted Successfully!
          </div>
        )}
        {error.finalsubmit && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-xl text-center font-medium">
            {error.finalsubmit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* First Name */}
          <div>
            <div className="relative flex items-center">
              <FiUser className="absolute left-4 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={form.firstName}
                onChange={changeHandle}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
            {error.firstName && (
              <span className="text-xs text-rose-500 mt-1 ml-1 block">
                {error.firstName}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div>
            <div className="relative flex items-center">
              <FiUser className="absolute left-4 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={changeHandle}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
            {error.lastName && (
              <span className="text-xs text-rose-500 mt-1 ml-1 block">
                {error.lastName}
              </span>
            )}
          </div>

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

          {/* Confirm Password */}
          <div>
            <div className="relative flex items-center">
              <FiLock className="absolute left-4 text-gray-400 text-lg" />
              <input
                type={showConfPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="conf_password"
                value={form.conf_password}
                onChange={changeHandle}
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfPassword(!showConfPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfPassword ? (
                  <FiEyeOff className="text-lg" />
                ) : (
                  <FiEye className="text-lg" />
                )}
              </button>
            </div>
            {error.conf_password && (
              <span className="text-xs text-rose-500 mt-1 ml-1 block">
                {error.conf_password}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/auth"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
