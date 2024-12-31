import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <main className="flex-grow bg-blue-950 text-indigo-100 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
