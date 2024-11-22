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
      {/* <AllUsers/> */}
    </DashboardLayout>
  );
};

export default StaffDashboard;
