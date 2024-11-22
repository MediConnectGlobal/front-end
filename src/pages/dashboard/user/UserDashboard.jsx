import { Users, ClipboardList, Book } from "lucide-react";
import DashboardLayout from "../../../layouts/DashboardLayout";

const links = [
  { name: "Book an Appointment", path: "/user-dashboard", icon: <Book /> },
  { name: "Staff", path: "/user-dashboard/allstaff", icon: <Users /> },
  { name: "My Prescriptions", path: "/user-dashboard/prescriptions/:id", icon: <ClipboardList /> },
  // { name: "Appointments", path: "/user-dashboard/appointments", icon: <ClipboardList /> },
];

const UserDashboard = () => {
  return <DashboardLayout links={links} />;
};

export default UserDashboard;
