import {
  FaShoppingBag,
  FaBox,
  FaUsers,
  
} from "react-icons/fa";
import { FaIndianRupeeSign,FaArrowTrendUp, } from "react-icons/fa6"

const icons = {
  revenue: FaIndianRupeeSign,
  orders: FaShoppingBag,
  products: FaBox,
  customers: FaUsers,
};

const AnalyticsCard = ({ item }) => {
  const Icon = icons[item.type];

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">
            {item.title}
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {item.value}
          </h2>
        </div>

        <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
          <Icon className="text-amber-500 text-xl" />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
          <FaArrowTrendUp />
          {item.change}
        </span>

        <span className="text-xs text-gray-400">
          {item.description}
        </span>
      </div>
    </div>
  );
};

export default AnalyticsCard;