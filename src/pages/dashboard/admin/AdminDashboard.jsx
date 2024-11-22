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
      {/* <AllStaff/> */}
     
    </DashboardLayout>
  );
};

export default AdminDashboard;
