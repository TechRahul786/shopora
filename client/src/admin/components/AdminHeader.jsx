import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiBell,
  FiUser,
  FiChevronDown,
  FiLogOut,
  FiSettings,
  FiShield,
} from "react-icons/fi";

const AdminHeader = ({ user, onLogout, onMenuClick }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminName =
    user?.firstName ||
    user?.firstname ||
    user?.name ||
    "Admin";

  const adminEmail = user?.email || "admin@example.com";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900 text-white shadow-md">
      <div className="flex min-h-20 items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">

        {/* Left: Logo and Mobile Menu */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              onMenuClick?.();
            }}
            className="rounded-lg p-2 text-gray-300 transition hover:bg-gray-800 hover:text-white lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <FiX size={23} /> : <FiMenu size={23} />}
          </button>

          <Link
            to="/admin"
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-gray-950">
              <FiShield size={24} />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold sm:text-xl">
                Admin Panel
              </h1>

              <p className="hidden text-xs text-gray-400 sm:block">
                E-commerce Management
              </p>
            </div>
          </Link>
        </div>

        {/* Right: Notifications and Profile */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-lg p-2.5 text-gray-300 transition hover:bg-gray-800 hover:text-white"
          >
            <FiBell size={21} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900" />
          </button>

          <div className="h-8 w-px bg-gray-700" />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-expanded={profileOpen}
              className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-800 sm:gap-3 sm:px-2"
            >
              {/* User Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-gray-950">
                <FiUser size={22} />
              </div>

              {/* User Name and Role */}
              <div className="hidden text-left sm:block">
                <p className="max-w-36 truncate text-sm font-semibold">
                  {adminName}
                </p>

                <p className="text-xs text-gray-400">
                  Administrator
                </p>
              </div>

              <FiChevronDown
                size={17}
                className={`hidden text-gray-400 transition sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 text-gray-800 shadow-xl">

                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="truncate font-semibold">
                    {adminName}
                  </p>

                  <p className="truncate text-sm text-gray-500">
                    {adminEmail}
                  </p>
                </div>

                <Link
                  to="/admin/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-100"
                >
                  <FiUser size={18} />
                  My Profile
                </Link>

                <Link
                  to="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-100"
                >
                  <FiSettings size={18} />
                  Settings
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout?.();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-gray-700 bg-gray-900 px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm transition hover:bg-gray-800"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/products"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm transition hover:bg-gray-800"
            >
              Manage Products
            </Link>

            <Link
              to="/admin/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm transition hover:bg-gray-800"
            >
              Manage Orders
            </Link>

            <Link
              to="/admin/users"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm transition hover:bg-gray-800"
            >
              Manage Users
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default AdminHeader;