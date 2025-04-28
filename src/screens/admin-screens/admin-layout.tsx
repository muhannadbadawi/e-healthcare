import { Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../api/authService";
import Layout from "../../components/layout";

const AdminLayout = () => {
  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { text: "Dashboard", path: "/admin/home", icon: <DashboardIcon /> },
    { text: "Clients", path: "/admin/clients", icon: <PeopleIcon /> },
    { text: "Doctors", path: "/admin/doctors", icon: <LocalHospitalIcon /> },
    { text: "Settings", path: "/admin/settings", icon: <SettingsIcon /> },
    { text: "Logout", action: handleLogout, icon: <LogoutIcon /> },
  ];

  return (
    <Box sx={{flex:1, display: "flex" }}>
      <Layout defaultRout="/admin/home" navItems={navItems} />
    </Box>
  );
};

export default AdminLayout;
