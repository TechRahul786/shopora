import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaXmark,
  FaLayerGroup,
  FaBagShopping,
} from "react-icons/fa6";
import ProductCard from "../components/common/ProductCard";
import { useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const products = useSelector((state) => state.data.products || []);

  const categories = useSelector(
    (state) => state.data.categories || state.data.categoies || [],
  );

  const { name: paramCategoryName } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(
    paramCategoryName ? decodeURIComponent(paramCategoryName) : "all",
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 9;

  // Sync category with URL
  useEffect(() => {
    if (paramCategoryName) {
      setSelectedCategory(decodeURIComponent(paramCategoryName));
    } else {
      setSelectedCategory("all");
    }

    setCurrentPage(1);
  }, [paramCategoryName]);

  // Get category name
  const getProductCategoryName = (product) => {
    if (!product.category) return "";

    if (typeof product.category === "object") {
      return product.category.name || "";
    }

    const matchedCat = categories.find((cat) => cat._id === product.category);

    return matchedCat ? matchedCat.name : product.category;
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;

    return products.filter(
      (product) =>
        getProductCategoryName(product).toLowerCase() ===
        selectedCategory.toLowerCase(),
    );
  }, [products, categories, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  // Category change
  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
    setShowFilters(false);

    if (categoryName === "all") {
      navigate("/products");
    } else {
      navigate(`/products/${encodeURIComponent(categoryName)}`);
    }
  };

  // Get category count
  const getCategoryCount = (categoryName) => {
    return products.filter(
      (product) =>
        getProductCategoryName(product).toLowerCase() ===
        categoryName.toLowerCase(),
    ).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Welcome to Shopora
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Discover Products
            </h1>

            <p className="text-gray-500 mt-2">
              Find your favourite products at the best prices.
            </p>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl font-semibold text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            <FaFilter />
            Categories
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <aside
            className={`${
              showFilters ? "fixed inset-0 z-50 flex" : "hidden"
            } lg:block lg:relative lg:z-auto`}
          >
            {/* Mobile Overlay */}
            {showFilters && (
              <div
                onClick={() => setShowFilters(false)}
                className="fixed inset-0 bg-black/40 lg:hidden"
              />
            )}

            <div
              className={`${
                showFilters
                  ? "relative z-10 w-[85%] max-w-sm h-full overflow-y-auto rounded-r-2xl"
                  : ""
              } lg:sticky lg:top-24 lg:h-fit lg:w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-5`}
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <FaLayerGroup className="text-indigo-600" />

                    <h2 className="text-lg font-bold text-gray-900">
                      Categories
                    </h2>
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    Browse by category
                  </p>
                </div>

                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-2 rounded-lg bg-gray-100 text-gray-600"
                >
                  <FaXmark />
                </button>
              </div>

              {/* All Products */}
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    selectedCategory === "all"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  <span className="flex items-center gap-3 font-semibold">
                    <FaBagShopping />
                    All Products
                  </span>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${
                      selectedCategory === "all"
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {products.length}
                  </span>
                </button>

                {/* Dynamic Categories */}
                {categories.map((category) => {
                  const categoryName = category.name;

                  const count = getCategoryCount(categoryName);

                  const isActive =
                    selectedCategory.toLowerCase() ===
                    categoryName.toLowerCase();

                  return (
                    <button
                      key={category._id || categoryName}
                      onClick={() => handleCategoryChange(categoryName)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                      }`}
                    >
                      <span className="font-medium text-left">
                        {categoryName}
                      </span>

                      <span
                        className={`text-xs px-2.5 py-1 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Footer */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                  Showing {filteredProducts.length} available products
                </p>
              </div>
            </div>
          </aside>

          {/* Main Products Section */}
          <main className="min-w-0">
            {/* Products Header */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedCategory === "all"
                      ? "All Products"
                      : selectedCategory}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {filteredProducts.length} products available
                  </p>
                </div>

                <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold w-fit">
                  {selectedCategory === "all"
                    ? "All Categories"
                    : selectedCategory}
                </div>
              </div>

              {/* Result Information */}
              {filteredProducts.length > 0 && (
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-gray-800">
                      {startIndex + 1}-
                      {Math.min(
                        startIndex + productsPerPage,
                        filteredProducts.length,
                      )}
                    </span>{" "}
                    of {filteredProducts.length} products
                  </p>

                  <p className="text-xs text-gray-400">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              )}
            </div>

            {/* Product Grid */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {currentProducts.map((product) => (
                  <ProductCard key={product._id} item={product} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white border border-gray-100 rounded-2xl py-20 px-5 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-5">
                  <FaBagShopping size={25} />
                </div>

                <h3 className="text-xl font-bold text-gray-800">
                  No Products Found
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  We couldn't find any products in this category.
                </p>

                <button
                  onClick={() => handleCategoryChange("all")}
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
                {/* Previous */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((prev) => prev - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <FaChevronLeft size={13} />
                </button>

                {/* Page Numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "border border-gray-200 bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((prev) => prev + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <FaChevronRight size={13} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
