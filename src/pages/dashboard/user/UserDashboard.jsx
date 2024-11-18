import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Users, ClipboardList } from "lucide-react";

const links = [
  { name: "Staff", path: "/patient/staff", icon: <Users /> },
  { name: "Appointments", path: "/patient/appointments", icon: <ClipboardList /> },
];

const UserDashboard = () => {
  return (
    <DashboardLayout links={links}>
      <h2>Welcome to the Patient Dashboard!</h2>
    </DashboardLayout>
  );
};

export default UserDashboard;
