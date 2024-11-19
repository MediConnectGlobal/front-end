import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children, links = [] }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar is open by default

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Layout for Sidebar and Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-[#0CBFC7] text-white w-64 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
          style={{
            height: "calc(100vh - 5rem)", // Adjust for the navbar height (5rem)
            position: "sticky",
            top: "5rem", // Start below navbar
          }}
        >
          <div className="p-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <button
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="text-white" />
            </button>
          </div>
          <ul className="space-y-4 p-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="flex items-center space-x-2">
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" className="flex items-center space-x-2">
                <LogOut />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
