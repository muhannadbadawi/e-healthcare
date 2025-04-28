import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../api/authService";
import Layout from "../../components/layout";

const DoctorLayout = () => {
  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { text: "Home", path: "/doctor/home", icon: <HomeIcon /> },
    { text: "History", path: "/doctor/history", icon: <HistoryIcon /> },
    { text: "Settings", path: "/doctor/settings", icon: <SettingsIcon /> },
    { text: "Logout", action: handleLogout, icon: <LogoutIcon /> },
  ];

  return (
    <Box sx={{ flex: 1, display: "flex" }}>
      <Layout defaultRout="/doctor/home" navItems={navItems} />
    </Box>
  );
};

export default DoctorLayout;
