import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getCategory,removeCategory } from "../../services/category";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  FiLayers,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiImage,
  FiTrash2,
  FiEdit,
} from "react-icons/fi";
import AddCategory from "../components/AddCategory";
import EditCategory from "../components/EditCategory";

const Category = () => {
  const [data, setData] = useState([]);
  const [newAdded , setNewAdded] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update,setUpdate] = useState('')
  const [flag,setFlag] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Fetch categories
  const getData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getCategory();
      const payload = res.data;

      const categories = Array.isArray(payload)
        ? payload
        : Array.isArray(payload.data);

      setData(categories);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError(err.response?.data?.message || "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  },[getData,newAdded]);

  // Delete handler
  const handleremoveCategory = async (id) => {
    try {
    console.log("Deleting category ID:", id);

    const res = await removeCategory(id);

    if (res.success === true) {
      setNewAdded((prev) => !prev);
      console.log("Category deleted successfully:", res);
    }
  } catch (error) {
    console.error(
      "Delete category error:",
      error.response?.data || error.message
    );
  }
  };

  // Edit handler
  const updateCategory = (id) => {
    
    setUpdate(id)
    handleOpenModal()

    console.log("Category ID to update:", id);
  };

  // Table columns
  const columns = useMemo(
    () => [
      {
        id: "image",
        header: "Image",
        cell: ({ row }) => {
          const category = row.original;

          // Support common image field formats.
          const imageUrl = category.image;

          return (
            <div className="flex items-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={category.name || "Category"}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.nextElementSibling.style.display =
                      "flex";
                  }}
                  className="h-14 w-14 rounded-xl border border-gray-200 bg-gray-50 object-cover"
                />
              ) : null}

              <div
                className={`h-14 w-14 ${
                  imageUrl ? "hidden" : "flex"
                } items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-gray-400`}
              >
                <FiImage size={22} />
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "name",
        header: "Category Name",
        cell: ({ getValue }) => (
          <span className="font-semibold text-gray-800">
            {getValue() || "Unnamed Category"}
          </span>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => (
          <p
            className="max-w-sm truncate text-gray-500"
            title={getValue() || ""}
          >
            {getValue() || "No description available"}
          </p>
        ),
      },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>updateCategory(row.original._id)}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-red-100"
            >
              <FiEdit size={15} />
              Edit
            </button>

            <button
              type="button"
              onClick={() => handleremoveCategory(row.original._id)}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              <FiTrash2 size={15} />
              Delete
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const category = row.original;

      const searchableText = [category.name, category.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(filterValue.toLowerCase());
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600">
              <FiLayers size={17} />
              Store Management
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Categories
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage and organize your store categories.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FiLayers size={22} />
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Total Categories
              </p>

              <p className="text-2xl font-bold text-gray-900">{data.length}</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Search Header */}
          <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                All Categories
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Browse your categories and their details.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              
              <button
                onClick={()=>{setFlag(true),handleOpenModal}}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                + Add Category
              </button>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <FiSearch
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />

              <input
                type="search"
                value={globalFilter}
                onChange={(event) => {
                  setGlobalFilter(event.target.value);
                  table.setPageIndex(0);
                }}
                placeholder="Search categories..."
                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center px-6 py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

              <p className="mt-4 text-sm text-gray-500">
                Loading categories...
              </p>
            </div>
          ) : error ? (
            /* Error */
            <div className="px-6 py-16 text-center">
              <p className="font-medium text-red-600">{error}</p>

              <button
                type="button"
                onClick={getData}
                className="mt-4 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="border-b border-gray-200 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map((row, index) => (
                        <tr
                          key={row.id}
                          className={`transition hover:bg-indigo-50/40 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className="px-6 py-4 align-middle"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="px-6 py-16 text-center"
                        >
                          <div className="flex flex-col items-center">
                            <FiLayers size={32} className="text-gray-300" />

                            <p className="mt-3 font-medium text-gray-700">
                              No categories found
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                              Try a different search term.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {isModalOpen && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={handleCloseModal}
                  >
                    <div
                      className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">
                          {flag?('Add Category'):('Edit Category')}
                        </h2>

                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                          aria-label="Close modal"
                        >
                          ✕
                        </button>
                      </div>

                      {flag?(<AddCategory setNewAdded={setNewAdded} handleCloseModal={handleCloseModal}/>):(<EditCategory  setNewAdded={setNewAdded}  update={update} onClose={handleCloseModal}/>)}     

                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-800">
                    {table.getRowModel().rows.length > 0
                      ? table.getState().pagination.pageIndex *
                          table.getState().pagination.pageSize +
                        1
                      : 0}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-gray-800">
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-800">
                    {table.getFilteredRowModel().rows.length}
                  </span>{" "}
                  categories
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={table.getState().pagination.pageSize}
                    onChange={(event) =>
                      table.setPageSize(Number(event.target.value))
                    }
                    aria-label="Rows per page"
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-indigo-500"
                  >
                    {[5, 10, 20, 50].map((size) => (
                      <option key={size} value={size}>
                        {size} per page
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="Previous page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FiChevronLeft size={18} />
                  </button>

                  <span className="min-w-20 text-center text-sm font-medium text-gray-700">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {Math.max(table.getPageCount(), 1)}
                  </span>

                  <button
                    type="button"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label="Next page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FiChevronRight size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
