import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import background from "../assets/background.jpg";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className={`flex flex-col min-h-screen`}
      style={{
        backgroundImage: `linear-gradient(rgba(10, 3, 35, 0.6), rgba(8, 3, 38, 0.6)), url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      <main className="flex-grow text-indigo-100 py-8 mt-12 bg-transparent">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
