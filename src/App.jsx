import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthWrapper from './layouts/AuthWrapper';

function App() {
 const router = createBrowserRouter([
{
  path: "/",
  element: <AuthWrapper/>,
},
 ])

  return <RouterProvider router={router} />;
}

export default App;
