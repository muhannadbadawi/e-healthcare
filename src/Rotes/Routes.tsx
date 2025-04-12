import { createBrowserRouter } from "react-router-dom";
import Login from "../screens/login-screen/Login";
import Register from "../screens/register-screen/Register";
import ProtectedRoute from "./ProtectedRoute";
import AdminHome from "../screens/admin-screens/home";
import DoctorHome from "../screens/doctor-screens/home";
import ClientHome from "../screens/client-screens/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>, // or a dedicated NotFound component
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/home",
    element: (
      <ProtectedRoute role="admin">
        <AdminHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/doctor/home",
    element: (
      <ProtectedRoute role="doctor">
        <DoctorHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client/home",
    element: (
      <ProtectedRoute role="client">
        <ClientHome />
      </ProtectedRoute>
    ),
  },
]);
