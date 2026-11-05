import React from "react";
import { Link } from "react-router-dom";
import {
  FaBagShopping,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaGooglePlay,
  FaApple,
  FaArrowRight,
} from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  const shopLinks = [
    { name: "All Categories", path: "/categories" },
    { name: "New Arrivals", path: "/products?sort=newest" },
    { name: "Best Sellers", path: "/products?sort=popular" },
    { name: "Deals & Offers", path: "/deals" },
    { name: "Gift Cards", path: "/gift-cards" },
  ];

  const customerLinks = [
    { name: "My Account", path: "/profile" },
    { name: "My Orders", path: "/orders" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Shopping Cart", path: "/cart" },
    { name: "FAQs", path: "/faq" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Return Policy", path: "/return-policy" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">

          {/* Brand Section */}
          <div className="lg:col-span-2">

            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-900/30">
                <FaBagShopping className="text-xl" />
              </div>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                Shop<span className="text-blue-500">ora</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Discover a better way to shop with Shopora. Explore quality
              products, enjoy great deals, and experience convenient
              shopping all in one place.
            </p>

            {/* Contact Information */}
            <div className="mt-6 space-y-3 text-sm">

              <div className="flex items-center gap-3">
                <FiMail className="text-blue-500" />
                <span>support@shopora.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="text-blue-500" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMapPin className="text-blue-500" />
                <span>India</span>
              </div>

            </div>

            {/* Social Media */}
            <div className="mt-7 flex items-center gap-3">

              {[
                { icon: <FaFacebookF />, link: "https://facebook.com" },
                { icon: <FaInstagram />, link: "https://instagram.com" },
                { icon: <FaTwitter />, link: "https://twitter.com" },
                { icon: <FaYoutube />, link: "https://youtube.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}

            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="mb-5 text-base font-bold text-white">
              Shop
            </h3>

            <ul className="space-y-3">
              {shopLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-400 transition hover:pl-1 hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-5 text-base font-bold text-white">
              Customer Service
            </h3>

            <ul className="space-y-3">
              {customerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-400 transition hover:pl-1 hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-base font-bold text-white">
              Company
            </h3>

            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-400 transition hover:pl-1 hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* App Download Section */}
        <div className="mt-12 flex flex-col justify-between gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:flex-row sm:items-center">

          <div>
            <h3 className="text-lg font-bold text-white">
              Shop on the go!
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Get the Shopora app for a better shopping experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <a
              href="#"
              className="flex items-center gap-3 rounded-lg bg-white px-4 py-2.5 text-slate-900 transition hover:bg-slate-200"
            >
              <FaGooglePlay className="text-2xl" />
              <div>
                <p className="text-[10px]">GET IT ON</p>
                <p className="text-sm font-bold">Google Play</p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-lg bg-white px-4 py-2.5 text-slate-900 transition hover:bg-slate-200"
            >
              <FaApple className="text-2xl" />
              <div>
                <p className="text-[10px]">DOWNLOAD ON THE</p>
                <p className="text-sm font-bold">App Store</p>
              </div>
            </a>

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:px-8">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Shopora. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Made with <span className="text-red-500">♥</span> for better shopping.
          </p>

        </div>
      </div>

    </footer>
  );
};

export default Footer;