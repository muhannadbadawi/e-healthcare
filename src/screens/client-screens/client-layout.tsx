import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../api/authService";
import Layout from "../../components/layout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useCallback, useEffect } from "react";
import useSocket from "../../hooks/use-socket";
import { useNavigate } from "react-router-dom";

const ClientLayout = () => {
  const currentUser = localStorage.getItem("user"); // الحصول على بيانات المستخدم من localStorage
  const userId = currentUser ? JSON.parse(currentUser).id : null; // التأكد من وجود userId في localStorage
  const socket = useSocket(userId); // استدعاء هوك useSocket
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    socket.on("chatRequest", handleChatRequest);

    return () => {
      socket.off("chatRequest", handleChatRequest);
    };
  }, [socket]);

  const handleChatRequest = useCallback(
    (data: { from: string; requestType: string }) => {
      console.log("data.from: ", data.requestType);
      if (data.requestType === "AGREE") {
        navigate(`/client/chat/${data.from}`);
      }
    },
    [navigate]
  );

  const handleLogout = () => {
    socket?.disconnect(); // ⬅️ فصل الاتصال قبل تسجيل الخروج
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
