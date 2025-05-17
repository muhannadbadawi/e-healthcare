import { Box, Dialog } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../api/authService";
import Layout from "../../components/layout";
import useSocket from "../../hooks/use-socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorLayout = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const doctorId = user?.id; // تأكد من أن لديك معرف الطبيب هنا
  const socket = useSocket(doctorId);
  const [clientIdRequest, setClientRequest] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;
    // console.log("socket: ", socket);
    socket.emit("setOnline");

    // استقبال الرسائل
    socket.on("chatRequest", (data: { from: string; requestType: string }) => {
      setClientRequest(data.from);
      console.log("data.from: ", data.requestType);
    });

    // التنظيف عند فك الاتصال
    return () => {
      socket.off("chatRequest");
    };
  }, [doctorId, socket]);

  const handleLogout = () => {
    logout();
  };

  const agreeRequest = () => {
    socket?.emit("chatRequest", {
      recipientId: clientIdRequest,
      requestType: "AGREE",
    });
    navigate("/doctor/chat", {state:clientIdRequest});

    setClientRequest(null);
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
      {clientIdRequest && (
        <Dialog open={true}>
          <Box sx={{ padding: 2 }}>
            <h2>New Chat Request</h2>
            {/* عرض اسم العميل والتخصص بدلاً من ID فقط */}
            {/* <p>Client: {clientIdRequest.name}</p>
            <p>Specialty: {clientIdRequest.specialty}</p> */}
            <button onClick={() => setClientRequest(null)}>Disagree</button>
            <button onClick={agreeRequest}>Agree</button>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default DoctorLayout;
