import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../screens/login-screen/Login";
import Register from "../screens/register-screen/Register";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../screens/admin-screens/admin-layout";
import DoctorLayout from "../screens/doctor-screens/doctor-layout";
import ClientLayout from "../screens/client-screens/client-layout";

import AdminDashboard from "../screens/admin-screens/admin-dashboard/admin-dashboard";
import AdminDoctorsManagement from "../screens/admin-screens/admin-doctors-management/admin-doctors-management";
import AdminClientManagement from "../screens/admin-screens/admin-client-management/admin-client-management";
import AdminSettings from "../screens/admin-screens/admin-settings/admin-settings";

import DoctorHome from "../screens/doctor-screens/doctor-home/doctor-home";

import ClientHome from "../screens/client-screens/client-home/client-home";
import MedicalSpecialties from "../screens/client-screens/medical-specialties/medical-specialties";

import { UserTypeEnum } from "../enums/user-type-enum";

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
      { path: "", element: <Navigate to="home" replace /> }, // redirect /admin -> /admin/home
      { path: "home", element: <AdminDashboard /> },
      { path: "doctors", element: <AdminDoctorsManagement /> },
      { path: "clients", element: <AdminClientManagement /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },
  {
    path: "/doctor",
    element: (
      <ProtectedRoute role={UserTypeEnum.DOCTOR}>
        <DoctorLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to="home" replace /> }, // redirect /doctor -> /doctor/home
      { path: "home", element: <DoctorHome /> },
    ],
  },
  {
    path: "/client",
    element: (
      <ProtectedRoute role={UserTypeEnum.CLIENT}>
        <ClientLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to="home" replace /> }, // redirect /client -> /client/home
      { path: "home", element: <ClientHome /> },
      { path: "medical-specialties", element: <MedicalSpecialties /> },
    ],
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>, // could be a NotFound component
  },
]);
