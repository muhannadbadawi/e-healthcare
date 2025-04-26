import { createBrowserRouter } from "react-router-dom";
import Login from "../screens/login-screen/Login";
import Register from "../screens/register-screen/Register";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../screens/admin-screens/admin-layout";
import DoctorHome from "../screens/doctor-screens/doctor-home/doctor-home";
import ClientHome from "../screens/client-screens/home";
import { UserTypeEnum } from "../enums/user-type-enum";
import AdminDashboard from "../screens/admin-screens/admin-dashboard/admin-dashboard";
import AdminDoctorsManagement from "../screens/admin-screens/admin-doctors-management/admin-doctors-management";
import AdminClientManagement from "../screens/admin-screens/admin-client-management/admin-client-management";
import DoctorLayout from "../screens/doctor-screens/admin-layout";

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
        element: <AdminClientManagement />, // This could be a specific page for managing clients
      },
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
      {
        path: "home",
        element: <DoctorHome />, // Default to dashboard
      },
    ],
  },
  // {
  //   path: "/doctor",
  //   element: (
  //     <ProtectedRoute role={UserTypeEnum.DOCTOR}>
  //       {/* <DoctorLayout /> */}
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/client/home",
    element: (
      <ProtectedRoute role={UserTypeEnum.CLIENT}>
        <ClientHome />
      </ProtectedRoute>
    ),
  },
]);
