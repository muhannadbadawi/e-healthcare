import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../api/authService";
import Layout from "../../components/layout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const ClientLayout = () => {
  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { text: "Home", path: "/client/home", icon: <HomeIcon /> },
    {
      text: "Medical Specialties",
      path: "/client/medical-specialties",
      icon: <LocalHospitalIcon />,
    },

    { text: "History", path: "/client/history", icon: <HistoryIcon /> },
    { text: "Settings", path: "/client/settings", icon: <SettingsIcon /> },
    { text: "Logout", action: handleLogout, icon: <LogoutIcon /> },
  ];

  return (
    <Box sx={{ flex: 1, display: "flex" }}>
      <Layout defaultRout="/client/home" navItems={navItems} />
    </Box>
  );
};

export default ClientLayout;
