import { createBrowserRouter } from "react-router-dom";
import Login from "../screens/login-screen/Login";
import Register from "../screens/register-screen/Register";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../screens/admin-screens/admin-layout";
import DoctorHome from "../screens/doctor-screens/home";
import ClientHome from "../screens/client-screens/home";
import { UserTypeEnum } from "../enums/user-type-enum";
import AdminDashboard from "../screens/admin-screens/admin-dashboard/admin-dashboard";
import AdminDoctorsManagement from "../screens/admin-screens/admin-doctors-management/admin-doctors-management";

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
    path: "/admin",
    element: (
      <ProtectedRoute role={UserTypeEnum.ADMIN}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <AdminDashboard />, // Default to dashboard
      },
      {
        path: "doctors",
        element: <AdminDoctorsManagement />, // This could be a specific page for managing doctors
      },
      {
        path: "clients",
        element: <AdminLayout />, // This could be a specific page for managing clients
      },
    ],
  },
  {
    path: "/doctor/home",
    element: (
      <ProtectedRoute role={UserTypeEnum.DOCTOR}>
        <DoctorHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client/home",
    element: (
      <ProtectedRoute role={UserTypeEnum.CLIENT} >
        <ClientHome />
      </ProtectedRoute>
    ),
  },
]);
