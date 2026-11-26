const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const RecentOrders = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">
          Recent Orders
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Latest customer orders
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Amount</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="p-4 text-sm font-semibold text-gray-800">
                  {order.id}
                </td>

                <td className="p-4 text-sm text-gray-600">
                  {order.customer}
                </td>

                <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                  {order.date}
                </td>

                <td className="p-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                  ₹{order.amount.toLocaleString("en-IN")}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[order.status] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;