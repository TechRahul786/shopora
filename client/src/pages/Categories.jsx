import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Categories = () => {
  const categories = useSelector(
    (state) => state.data.categories || state.data.categoies || []
  );

  const products = useSelector((state) => state.data.products || []);

  // Get product count for each category
  const getProductCount = (category) => {
    return products.filter((product) => {
      if (!product.category) return false;

      if (typeof product.category === "object") {
        return (
          product.category._id === category._id ||
          product.category.name?.toLowerCase() ===
            category.name?.toLowerCase()
        );
      }

      return (
        product.category === category._id ||
        product.category.toLowerCase() === category.name?.toLowerCase()
      );
    }).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">

          <div>
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              Explore Shopora
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Shop by Category
            </h1>

            <p className="text-gray-500 mt-2">
              Find everything you need, all in one place.
            </p>
          </div>

          <Link
            to="/products/all"
            className="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Explore Products
            <FaArrowRightLong />
          </Link>

        </div>

        {/* Category Grid */}
        {categories.length > 0 ? (

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">

            {categories.map((category) => {

              const count = getProductCount(category);

              const categoryImage =
                category.image ||
                category.img ||
                category.thumbnail ||
                "https://placehold.co/400x400?text=Category";

              return (

                <Link
                  key={category._id || category.name}
                  to={`/products/${encodeURIComponent(category.name)}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  {/* Round Image */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-100 overflow-hidden border-4 border-gray-50 group-hover:border-indigo-100 transition-all duration-300">

                    <img
                      src={categoryImage}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                  </div>

                  {/* Category Details */}
                  <div className="mt-5 w-full">

                    <h2 className="text-base font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 truncate">
                      {category.name}
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      {count} {count === 1 ? "Product" : "Products"}
                    </p>

                  </div>

                  {/* Arrow Button */}
                  <div className="mt-4 w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">

                    <FaArrowRightLong size={13} />

                  </div>

                </Link>

              );
            })}

          </div>

        ) : (

          /* Empty State */
          <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">

            <div className="text-5xl mb-4">🛍️</div>

            <h3 className="text-xl font-bold text-gray-800">
              No Categories Found
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Categories will appear here once they are added.
            </p>

          </div>

        )}

      </div>
    </div>
  );
};

export default Categories;