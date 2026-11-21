import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight, FaFilter } from "react-icons/fa6";
import ProductCard from "../components/common/ProductCard";

const Products = () => {
  const products = useSelector((state) => state.data.products || []);
  const categories = useSelector(
    (state) => state.data.categoies || []
  );

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 9;

  // Helper to get category name from a product (works if product.category is populated or just an ID)
  const getProductCategoryName = (product) => {
    if (!product.category) return "";
    if (typeof product.category === "object") {
      return product.category.name || "";
    }
    const matchedCat = categories.find((cat) => cat._id === product.category);
    return matchedCat ? matchedCat.name : product.category;
  };

  // Filter products by category name
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;

    return products.filter(
      (product) =>
        getProductCategoryName(product).toLowerCase() ===
        selectedCategory.toLowerCase()
    );
  }, [products, categories, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Products
            </h1>
            <p className="text-gray-500 mt-1">
              Discover products you'll love.
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg bg-white"
          >
            <FaFilter />
            Categories
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">

          {/* Category Sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block`}
          >
            <div className="bg-white rounded-xl border p-5 sticky top-24">

              <h2 className="text-lg font-bold mb-5">
                Categories
              </h2>

              <div className="space-y-2">

                {/* All Categories */}
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm transition ${
                    selectedCategory === "all"
                      ? "bg-black text-white font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>

                {/* Dynamic Categories */}
                {categories.map((category) => {
                  const categoryName = category.name;

                  const count = products.filter(
                    (product) =>
                      getProductCategoryName(product).toLowerCase() ===
                      categoryName.toLowerCase()
                  ).length;

                  return (
                    <button
                      key={category._id || categoryName}
                      onClick={() =>
                        handleCategoryChange(categoryName)
                      }
                      className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm transition ${
                        selectedCategory === categoryName
                          ? "bg-black text-white font-semibold"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-left">{categoryName}</span>
                      <span>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <main>

            {/* Products Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCategory === "all"
                    ? "All Products"
                    : selectedCategory}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Showing {filteredProducts.length === 0 ? 0 : startIndex + 1}
                  {" - "}
                  {Math.min(
                    startIndex + productsPerPage,
                    filteredProducts.length
                  )}{" "}
                  of {filteredProducts.length} products
                </p>
              </div>
            </div>

            {/* Product Grid */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    item={product}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border rounded-xl py-20 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  No Products Found
                </h3>
                <p className="text-gray-500 mt-2">
                  There are no products in this category.
                </p>

                <button
                  onClick={() => handleCategoryChange("all")}
                  className="mt-5 px-5 py-2 bg-black text-white rounded-lg"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">

                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                  className="p-3 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
                >
                  <FaChevronLeft size={13} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "border bg-white hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                  className="p-3 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
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