import AnalyticsCard from "../components/analytics/AnalyticsCard";
import RevenueChart from "../components/analytics/RevenueChart";
import OrdersChart from "../components/analytics/OrdersChart";
import CategoryChart from "../components/analytics/CategoryChart";
import RecentOrders from "../components/analytics/RecentOrders";

import {
  overviewData,
  revenueData,
  ordersData,
  categoryData,
    recentOrders,

} from "../../sample/analyticsData.js";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Analytics
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Track your store performance and sales.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600">
          November 2026
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {overviewData.map((item) => (
          <AnalyticsCard key={item.type} item={item} />
        ))}
      </div>

      {/* Revenue and Orders Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <RevenueChart data={revenueData} />
        <OrdersChart data={ordersData} />
      </div>

      {/* Category Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <CategoryChart data={categoryData} />
        </div>

        <div className="lg:col-span-2">
          <RecentOrders data={recentOrders} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;