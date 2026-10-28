import React, { useState } from "react";
import { adminLogin } from "../../services/auth";
import { useDispatch } from "react-redux";
import { clearState, setUser } from "../store/slice/authSclice";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await adminLogin(form);

      console.log("Login response:", response);

      if (response.success === true) {
        const user = response.user;

        // Ensure only administrators can access the admin panel
        if (user?.role !== "admin") {
          setError("Access denied. Admin account required.");
          return;
        }

        dispatch(setUser(user));

        navigate("/admin", { replace: true });
      } else {
        setError(response.message || "Login failed");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );

      dispatch(clearState());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Admin Login
        </h2>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-amber-500 p-3 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;