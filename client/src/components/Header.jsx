import React, { useState, useEffect, useRef } from "react";
import {
  FaBookmark,
  FaRegCircleUser,
  FaOpencart,
  FaMagnifyingGlass,
  FaBagShopping,
  FaBars,
  FaXmark,
  FaCartShopping
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ user, product = [], mobileNav, setMobileNav }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

  // Handle Search Input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const filtered = product.filter((item) =>
      item?.name?.toLowerCase().includes(value.toLowerCase().trim())
    );

    setSearchResults(filtered);
    setIsDropdownOpen(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
            <FaBagShopping className="text-xl" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-gray-800">
            Shop<span className="text-blue-600">ora</span>
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div ref={searchRef} className="relative hidden flex-1 max-w-xl md:block">
          <div className="flex w-full items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
            <FaMagnifyingGlass className="ml-4 shrink-0 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              placeholder="Search products, brands and more..."
              onChange={handleSearch}
              onFocus={() => searchTerm && setIsDropdownOpen(true)}
              className="w-full bg-transparent px-3 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSearchResults([]);
                  setIsDropdownOpen(false);
                }}
                className="px-2 text-gray-400 hover:text-gray-600"
              >
                <FaXmark />
              </button>
            )}
            <button
              type="button"
              className="flex h-full items-center justify-center bg-blue-600 p-2 m-1 rounded-full text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          {/* Desktop Search Dropdown */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 max-h-96 overflow-y-auto rounded-xl border border-gray-100 bg-white p-2 shadow-xl z-50">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <Link
                    key={item.id || item._id}
                    to={`/product-details/${item.id || item._id}`}
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-2.5 transition hover:bg-gray-50"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </span>
                      {item.price && (
                        <span className="text-xs font-medium text-blue-600">
                          Rs{item.price}
                        </span>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No products found for "{searchTerm}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-5">
          {/* Account */}
          <Link
            to="/profile"
            className="group flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 sm:flex-row sm:gap-2 sm:px-3"
          >
            <FaRegCircleUser className="text-xl" />
            <span className="hidden text-sm font-medium sm:block">
              {user ? user.firstName : "Account"}
            </span>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="group flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 sm:flex-row sm:gap-2 sm:px-3"
          >
            <FaBookmark className="text-xl" />
            <span className="hidden text-sm font-medium sm:block">
              Wishlist
            </span>
          </Link>

          {/* Cart */}
         <Link to="/cart" className="relative">
  <FaCartShopping size={22} />

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
      {cartCount}
    </span>
  )}
</Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMobileNav}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 md:hidden"
          >
            {mobileNav ? <FaXmark className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Search Bar - Mobile */}
      <div className="px-4 pb-4 md:hidden relative">
        <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <FaMagnifyingGlass className="ml-3 shrink-0 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products and brands..."
            className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            className="bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700"
          >
            <FaMagnifyingGlass />
          </button>
        </div>

        {/* Mobile Search Dropdown */}
        {isDropdownOpen && searchResults.length > 0 && (
          <div className="mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
            {searchResults.map((item) => (
              <Link
                key={item.id || item._id}
                to={`/product/${item.id || item._id}`}
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-800">{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;