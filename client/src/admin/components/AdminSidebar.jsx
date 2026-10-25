import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiPlusSquare,
  FiPackage,
  FiLayers,
  FiShoppingBag,
  FiExternalLink,
  FiChevronRight,
} from "react-icons/fi";

const AdminSidebar = () => {
  const navigationLinks = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FiGrid size={20} />,
      end: true,
    },
    {
      name: "Add Product",
      path: "/admin/add-product",
      icon: <FiPlusSquare size={20} />,
    },
    {
      name: "Show Products",
      path: "/admin/products",
      icon: <FiPackage size={20} />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FiLayers size={20} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FiShoppingBag size={20} />,
    },
  ];

  const linkClasses = ({ isActive }) =>
    `group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-amber-500 text-gray-950 shadow-md"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-gray-800 bg-gray-900 text-white md:flex">
      {/* Sidebar Header */}
      <div className="border-b border-gray-800 px-5 py-6">
        <h2 className="text-xl font-bold tracking-wide">
          Admin <span className="text-amber-500">Panel</span>
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Manage your store
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3 py-6">
        <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Main Menu
        </p>

        {navigationLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.end}
            className={linkClasses}
          >
            <span className="flex items-center gap-3">
              {link.icon}
              <span>{link.name}</span>
            </span>

            <FiChevronRight
              size={16}
              className="opacity-0 transition group-hover:opacity-100"
            />
          </NavLink>
        ))}
      </nav>

      {/* Bottom Link */}
      <div className="border-t border-gray-800 p-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
        >
          <FiExternalLink size={20} />
          <span>Visit Store</span>
        </NavLink>

        <p className="mt-4 text-center text-xs text-gray-500">
          E-commerce Admin
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;