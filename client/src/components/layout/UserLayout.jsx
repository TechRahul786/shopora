import { Outlet } from "react-router-dom";
import Header from "../Header";
import Navigation from "./Navigation";
import { useState } from "react";
import Footer from "../Footer";

const UserLayout = () => {
  const [mobileNav,setMobileNav] = useState(false)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header setMobileNav={setMobileNav} mobileNav={mobileNav}/>
      <Navigation categories={categories} mobileNav={mobileNav}/>
      <main className="mx-auto max-w-7xl p-4">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default UserLayout;

const categories = [
  {
    _id: "1",
    name: "Electronics"
  },
  {
    _id: "2",
    name: "Home Furniture and Decoration"
  },
  {
    _id: "3",
    name: "Fashion"
  },
  {
    _id: "1",
    name: "Electronics"
  },
  {
    _id: "2",
    name: "Home Furniture and Decoration"
  },
  {
    _id: "3",
    name: "Fashion"
  },
  {
    _id: "1",
    name: "Electronics"
  },
  {
    _id: "2",
    name: "Home Furniture and Decoration"
  },
  {
    _id: "3",
    name: "Fashion"
  }
]