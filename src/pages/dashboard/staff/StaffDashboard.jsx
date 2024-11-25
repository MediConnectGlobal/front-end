import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Users, ClipboardList, FileText } from "lucide-react";
// import AllUsers from "./AllUsers";

const links = [
  { name: "Users", path: "/staff-dashboard", icon: <Users /> },
  { name: "Bookings", path: "/staff-dashboard/my-bookings", icon: <ClipboardList /> },
  { name: "Prescriptions", path: "/staff-dashboard/prescription", icon: <FileText /> },
];

const StaffDashboard = () => {
  return (
    <DashboardLayout links={links}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Stats Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">My Appointments</h3>
          {/* Content */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Prescriptions</h3>
          {/* Content */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Patient Stats</h3>
          {/* Content */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;
