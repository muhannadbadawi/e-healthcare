import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../api/authService";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../components/SocketContext";
import { getSessionPrice } from "../../api/doctorService";

const DoctorLayout = () => {
  const { socket } = useSocketContext();
  const [clientInfoRequest, setClientInfoRequest] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [showSessionPriceDialog, setShowSessionPriceDialog] = useState(false);
  const checkSessionPrice = async () => {

    if (!user.id) return;
    if (user.role !== "doctor") return;
    try {
      const sessionPrice = await getSessionPrice();
      if (sessionPrice  === 0) {
        setShowSessionPriceDialog(true);
      }
    } catch (error) {
      console.error("Failed to fetch session price:", error);
      setShowSessionPriceDialog(true);
    }
  };
  useEffect(() => {
    if (!socket) return;
    checkSessionPrice();

    socket.emit("setOnline");

    socket.on(
      "chatRequest",
      (data: { from: string; name: string; requestType: string }) => {
        setClientInfoRequest({ id: data.from, name: data.name });
        console.log("data.from: ", data.requestType);
      }
    );

    return () => {
      socket.off("chatRequest");
    };
  }, [socket]);

  const handleLogout = () => {
    socket?.disconnect();
    logout();
  };

  const agreeRequest = () => {
    socket?.emit("chatRequest", {
      recipientId: clientInfoRequest?.id,
      requestType: "AGREE",
    });
    navigate(`/doctor/chat/${clientInfoRequest?.id}`);
    setClientInfoRequest(null);
  };

  const closeSessionPriceDialog = () => {
    setShowSessionPriceDialog(false);
  };

  const goToSettings = () => {
    closeSessionPriceDialog();
    navigate("/doctor/settings");
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
      <Dialog
        open={showSessionPriceDialog}
        onClose={closeSessionPriceDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Session Price Required</DialogTitle>
        <DialogContent>
          <Typography>
            You must set your session price before going online and receiving
            consultation requests.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSessionPriceDialog} color="inherit">
            Later
          </Button>
          <Button onClick={goToSettings} variant="contained" color="primary">
            Set Price
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={!!clientInfoRequest?.id}
        onClose={() => setClientInfoRequest(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>New Chat Request</DialogTitle>
        <DialogContent>
          <Typography>
            You have a new chat request from client{" "}
            <strong>{clientInfoRequest?.name}</strong>. Do you want to accept?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setClientInfoRequest(null)}
          >
            Disagree
          </Button>
          <Button variant="contained" color="primary" onClick={agreeRequest}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorLayout;
