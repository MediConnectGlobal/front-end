import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Users, ClipboardList, FileText } from "lucide-react";

const links = [
  { name: "Users", path: "/staff/users", icon: <Users /> },
  { name: "Bookings", path: "/staff/bookings", icon: <ClipboardList /> },
  { name: "Prescriptions", path: "/staff/prescriptions", icon: <FileText /> },
];

const StaffDashboard = () => {
  return (
    <DashboardLayout links={links}>
      <h2>Welcome to the Staff Dashboard!</h2>
    </DashboardLayout>
  );
};

export default StaffDashboard;
