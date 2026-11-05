import React from "react";
import HeroCard from "./HeroCard";

const HeroSection = () => {
  const pastelColors = [
    { bg: "bg-sky-100", text: "text-sky-800" },
    { bg: "bg-rose-100", text: "text-rose-800" },
    { bg: "bg-amber-100", text: "text-amber-800" },
  ];
  const product = [
    {
      heading: "New Arrival",
      text: "Fresh Styles Just In",
      img: "https://res.cloudinary.com/daxyyfunr/image/upload/v1793873627/gaooifzcfc4gwyoljuc1.png",
    },
    {
      heading: "Home Refresh",
      text: "Make your space Better",
      img: "https://res.cloudinary.com/daxyyfunr/image/upload/v1793873627/gaooifzcfc4gwyoljuc1.png",
    },
    {
      heading: "Tech Essentials",
      text: "Upgrade your lifestyle",
      img: "https://res.cloudinary.com/daxyyfunr/image/upload/v1793873627/gaooifzcfc4gwyoljuc1.png",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {product.map((product, index) => (
        <HeroCard pastelColors={pastelColors[index]} product={product} />
      ))}
    </div>
  );
};

export default HeroSection;
