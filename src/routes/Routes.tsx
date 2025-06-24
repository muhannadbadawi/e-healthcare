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
import Chat from "../screens/chat/chat";
import { SocketProvider } from "../components/SocketContext";
import DoctorSettings from "../screens/doctor-screens/doctor-settings/doctor-settings";
import NotFound from "../screens/not-found/not-found";
import DoctorHistory from "../screens/doctor-screens/doctor-history/doctor-history";
import Settings from "../screens/client-screens/settings/settings";

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
      { path: "", element: <Navigate to="home" replace /> },
      { path: "home", element: <AdminDashboard /> },
      { path: "doctors", element: <AdminDoctorsManagement /> },
      { path: "clients", element: <AdminClientManagement /> },
      { path: "settings", element: <AdminSettings /> },
      { path: "history", element: <DoctorHistory /> },
    ],
  },
  {
    path: "/doctor",
    element: (
      <ProtectedRoute role={UserTypeEnum.DOCTOR}>
        <SocketProvider>
          <DoctorLayout />
        </SocketProvider>
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to="home" replace /> },
      { path: "home", element: <DoctorHome /> },
      { path: "settings", element: <DoctorSettings /> },
      { path: "chat/:clientId", element: <Chat /> },
      { path: "history", element: <DoctorHistory /> },
    ],
  },
  {
    path: "/client",
    element: (
      <ProtectedRoute role={UserTypeEnum.CLIENT}>
        <SocketProvider>
          <ClientLayout />
        </SocketProvider>
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to="home" replace /> },
      { path: "home", element: <ClientHome /> },
      { path: "medical-specialties", element: <MedicalSpecialties /> },
      { path: "chat/:doctorId", element: <Chat /> },
      { path: "history", element: <DoctorHistory /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
