import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppointmentBooking from './pages/AppointmentBooking';
// import HomePage from './pages/HomePage';
import RegistrationPage from './pages/forms/RegistrationPage';
import LandingPage from './pages/LandingPage';


import StaffComponent from './constants/StaffComponent';
import LoginPage from './pages/forms/LoginPage';
// import UserLogin from './pages/forms/UserLogin';
// import StaffLogin from './pages/forms/StaffLogin';
import Services from './pages/empty/services';
import Doctors from './pages/empty/Doctors';
import Contact from './pages/empty/Contact';
import RootLayout from './layouts/RootLayout';
import HealthCareSection from './components/HealthCareSection';
import StaffCarousel from './constants/Staff';
import StaffDashboard from './pages/dashboard/staff/StaffDashboard';
import UserDashboard from './pages/dashboard/user/UserDashboard';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import StaffDetail from './components/StaffDetail';
import AllStaff from './pages/dashboard/admin/AllStaff';
import AllUsers from './pages/dashboard/admin/AllUsers';
import SingleStaff from './pages/dashboard/admin/SingleStaff';
import SingleUser from './pages/dashboard/staff/SingleUser';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    // {
    //   path:"/home" ,
    //   element: <HomePage/>  ,
    // },
    {
      path: "/register",
      element: <RegistrationPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/healthcare",
      element: <HealthCareSection />,
    },
    {
      path: "/staffc",
      element: <StaffCarousel />,
    },
    {
      path: "/root",
      element: <RootLayout />,
    },

    // {
    //   path:"/userlogin" ,
    //   element: <UserLogin/>  ,
    // },
    // {
    //   path:"/stafflogin" ,
    //   element: <StaffLogin/>  ,
    // },

    {
      path: "/booking",
      element: <AppointmentBooking />,
    },

    {
      path: "/staff",
      element: <StaffComponent />,
    },
    {
      path: "/staff/:id",
      element: <StaffDetail/>,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/doctors",
      element: <Doctors />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },

    {
      path: "/staff-dashboard",
      element: <StaffDashboard/>,
      children : [
        {
          index: true,
          element: <AllUsers/>
        },
        {
          path: "singleuser/:id",
          element: <SingleUser/>,
        },

  
      ]
    },
    {
      path: "/user-dashboard",
      element: <UserDashboard/>,
      children : [



      ]
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboard/>,
      children : [

        {
          index: true,
          element: <AllUsers/>
        },
        {
          path: "singleuser/:id",
          element: <SingleUser/>,
        },

        {
          path: "allstaff",
          element: <AllStaff/>,
        },
        {
          path: "singlestaff/:id",
          element: <SingleStaff/>,
        },


      ]
    }

  


 ])

return <RouterProvider router={router} />;
}

export default App;
