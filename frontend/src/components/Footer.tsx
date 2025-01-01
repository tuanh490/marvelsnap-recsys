import React from "react";
import logo from "../assets/logo.png";
import { Link } from "@tanstack/react-router";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-20 hover:opacity-80" />
          </Link>

          <p className="text-sm font-roboto">
            © {new Date().getFullYear()} MSRecommender. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
