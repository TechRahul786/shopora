import React from "react";
import { FaIndianRupeeSign ,FaBagShopping,FaUserLarge} from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import TopDashCard from "../components/TopDashCard";
import RevenueAnalytics from "../components/RevenueAnalytics";
import RevenueCategory from "../components/RevenueCategory";

const Dashboard = () => {
  const topContent = [
    { icon: <FaIndianRupeeSign />, heading: "Total Revenue", value: "Rs 54,000" },
    { icon: <FaBagShopping />, heading: "Orders", value: "350" },
    { icon: <TbTruckDelivery/>, heading: "Shipments", value: "250" },
    { icon: <FaUserLarge/>, heading: "Total Customers", value: "1520" },
  ];

  return (
    <div className="flex flex-col gap-3">
    {/* topContent */}
    <div className="bg-white p-3 rounded-xl shadow-lg">
         <div className="flex flex-col gap-2 md:flex md:flex-row md:justify-between">
        {topContent.map((item,index)=>(
            <TopDashCard icon={item.icon} heading={item.heading} value={item.value} key={index}/>
        ))}
      
    </div>
    </div>
    {/* RevenueAnalytics and RevenueCategory*/}
    <div className="flex bg-white p-3 rounded-xl shadow-lg">
        <div className="w-2/3">
             <RevenueAnalytics/>
        </div>
        <div className="w-1/3">
             <RevenueCategory/>
        </div>
       
    </div>
    </div>
    
   
  );
};

export default Dashboard;
