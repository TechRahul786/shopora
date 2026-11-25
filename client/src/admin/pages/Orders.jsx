import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  getAllOrders,
  updateOrder,
} from "../../services/order";

import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);

      await updateOrder(id, status);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id
            ? {
                ...order,
                orderStatus: status,
                deliveredAt:
                  status === "Delivered"
                    ? new Date()
                    : order.deliveredAt,
              }
            : order
        )
      );
    } catch (error) {
      console.log(error);
      alert("Unable to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  // Table columns
  const columns = [
    {
      header: "Order ID",
      accessorKey: "_id",
      cell: ({ getValue }) => (
        <span className="font-medium text-indigo-600">
          #{getValue().slice(-8)}
        </span>
      ),
    },

    {
      header: "Customer",
      accessorKey: "userId",
      cell: ({ getValue }) => {
        const user = getValue();

        return (
          <div>
            <p className="font-semibold text-gray-800">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email}
            </p>
          </div>
        );
      },
    },

    {
      header: "Products",
      accessorKey: "orderItems",
      cell: ({ getValue }) => {
        const items = getValue() || [];

        return (
          <div className="min-w-40 space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-9 w-9 rounded-lg border object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      },
    },

    {
      header: "Total",
      accessorKey: "totalPrice",
      cell: ({ getValue }) => (
        <span className="font-bold text-gray-800">
          ₹{getValue()?.toLocaleString("en-IN")}
        </span>
      ),
    },

    {
      header: "Payment",
      accessorKey: "paymentInfo",
      cell: ({ getValue }) => {
        const payment = getValue();

        return (
          <div>
            <p className="text-sm font-medium text-gray-700">
              {payment?.method}
            </p>
            <span
              className={`text-xs font-semibold ${
                payment?.status === "Paid"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {payment?.status}
            </span>
          </div>
        );
      },
    },

    {
      header: "Shipping Address",
      accessorKey: "shippingAddress",
      cell: ({ getValue }) => {
        const address = getValue();

        return (
          <div className="min-w-40 text-sm text-gray-600">
            <p>{address?.street}</p>
            <p>
              {address?.city}, {address?.state}
            </p>
            <p>{address?.pincode}</p>
            <p>{address?.phone}</p>
          </div>
        );
      },
    },

    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-600">
          {new Date(getValue()).toLocaleDateString("en-IN")}
        </span>
      ),
    },

    {
      header: "Order Status",
      accessorKey: "orderStatus",
      cell: ({ getValue }) => {
        const status = getValue();

        const statusStyle = {
          Processing: "bg-amber-50 text-amber-700 ring-amber-200",
          Shipped: "bg-blue-50 text-blue-700 ring-blue-200",
          Delivered: "bg-green-50 text-green-700 ring-green-200",
          Cancelled: "bg-red-50 text-red-700 ring-red-200",
        };

        return (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
              statusStyle[status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {status}
          </span>
        );
      },
    },

    {
      header: "Action",
      accessorKey: "_id",
      cell: ({ row }) => {
        const order = row.original;

        return (
          <select
            value={order.orderStatus}
            disabled={updatingId === order._id}
            onChange={(e) =>
              handleStatusChange(order._id, e.target.value)
            }
            className="min-w-32 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        );
      },
    },
  ];

  // TanStack Table
  const table = useReactTable({
    data: orders,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase();

      const order = row.original;

      const customer =
        `${order.userId?.firstName || ""} ${
          order.userId?.lastName || ""
        } ${order.userId?.email || ""}`.toLowerCase();

      const orderId = order._id?.toLowerCase() || "";

      return (
        customer.includes(search) ||
        orderId.includes(search)
      );
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

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6">

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Orders Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track all customer orders.
        </p>
      </div>

      {/* Stats Card */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Orders
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {orders.length}
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            All orders received
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Revenue
          </p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            ₹
            {orders
              .filter((order) => order.paymentInfo?.status === "Paid")
              .reduce((total, order) => total + (order.totalPrice || 0), 0)
              .toLocaleString("en-IN")}
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            From paid orders
          </p>
        </div>

      </div>

      {/* Orders Table Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* Search Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center">

          <div>
            <h2 className="text-lg font-bold text-gray-800">
              All Orders
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              {table.getFilteredRowModel().rows.length} orders found
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search order ID or customer..."
              value={globalFilter ?? ""}
              onChange={(e) => {
                setGlobalFilter(e.target.value);
                table.setPageIndex(0);
              }}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-gray-100 transition hover:bg-gray-50/70"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="whitespace-nowrap px-5 py-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-16 text-center"
                  >
                    <p className="font-semibold text-gray-600">
                      No orders found
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      Try searching with another order ID or customer name.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 p-5 sm:flex-row">

          <p className="text-sm text-gray-500">
            Showing{" "}
            {table.getFilteredRowModel().rows.length === 0
              ? 0
              : table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                1}
            {" "}to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
            {" "}of {table.getFilteredRowModel().rows.length} orders
          </p>

          <div className="flex items-center gap-2">

            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
              {table.getState().pagination.pageIndex + 1} /{" "}
              {Math.max(table.getPageCount(), 1)}
            </span>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Orders;
