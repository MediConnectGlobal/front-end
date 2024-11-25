import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Users, ClipboardList, Settings } from "lucide-react";
// import AllStaff from "./AllStaff";
// import AllUsers from "./AllUsers";

const links = [
  { name: "All Users", path: "/admin/users", icon: <Users /> },
  { name: "All Staff", path: "/admin-dashboard/allstaff", icon: <ClipboardList /> },
  { name: "Bookings", path: "/admin/bookings", icon: <Settings /> },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout links={links}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Stats Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          {/* Content */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Staff</h3>
          {/* Content */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
          {/* Content */}
        </div>

        {/* Full Width Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          {/* Content */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
