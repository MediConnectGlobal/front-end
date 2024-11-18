import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";

const DashboardLayout = ({ children, links = [] }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar is open by default

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#0CBFC7] text-white w-64 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
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
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
