import { Users, ClipboardList, Book } from "lucide-react";
import DashboardLayout from "../../../layouts/DashboardLayout";

const links = [
  { name: "Book an Appointment", path: "/user-dashboard", icon: <Book /> },
  { name: "Staff", path: "/user-dashboard/allstaff", icon: <Users /> },
  { name: "My Prescriptions", path: "/user-dashboard/prescriptions/:id", icon: <ClipboardList /> },
  // { name: "Appointments", path: "/user-dashboard/appointments", icon: <ClipboardList /> },
];

const UserDashboard = () => {
  return (
    <DashboardLayout links={links}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* User Dashboard Content */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">My Appointments</h3>
          {/* Content */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">My Prescriptions</h3>
          {/* Content */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          {/* Content */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
