import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout';

import LoginForm from './pages/forms/LoginForm';

import RegisterForm from './pages/forms/RegisterForm';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import AppointmentBooking from './pages/AppointmentBooking';

function App() {
 const router = createBrowserRouter([
{
  path:"/" ,
  element: <RootLayout/>  ,
},
{
  path:"/register" ,
  element: <RegisterForm/> ,
},
{
  path:"/login" ,
  element: <LoginForm/>  ,
},
{
  path:"/booking" ,
  element: <AppointmentBooking/>  ,
},

{
  path:"/dasboard" ,
  element: <DoctorDashboard/>  ,
  children: [

  ]
},

 ])

  return <RouterProvider router={router} />;
}

export default App;
