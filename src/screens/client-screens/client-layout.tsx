import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../api/authService";
import Layout from "../../components/layout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../components/SocketContext";
import { getBalance, saveBalance } from "../../api/clientService";

export const BalanceContext = createContext<{
  selectedSessionPrice: number | undefined;
  balance: number | undefined;
  updateBalance: (newBalance: number) => void;
  updateSelectedSessionPrice?: (price: number) => void;
}>({
  selectedSessionPrice: undefined,
  balance: undefined,
  updateBalance: () => {},
  updateSelectedSessionPrice: () => {},
});

export const useBalanceContext = () => useContext(BalanceContext);
const ClientLayout = () => {
  const [balance, setBalance] = useState<number>(0);
  const [selectedSessionPrice, setSelectedSessionPrice] = useState<number>();

  const { socket } = useSocketContext();
  const navigate = useNavigate();

  const updateBalance = async (newBalance: number) => {
    setBalance(newBalance);
    await saveBalance(newBalance);
  };

  const updateSelectedSessionPrice = (price: number) => {
    setSelectedSessionPrice(price);
  };

  const fetchBalance = async () => {
    const clientBalance = await getBalance();
    setBalance(clientBalance);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("chatRequest", handleChatRequest);
    fetchBalance();

    return () => {
      socket.off("chatRequest", handleChatRequest);
    };
  }, [socket]);

  const handleChatRequest = useCallback(
    (data: { from: string; requestType: string }) => {
      if (data.requestType === "AGREE") {
        navigate(`/client/chat/${data.from}`);
      }
    },
    [navigate]
  );

  const handleLogout = () => {
    socket?.disconnect();
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
    <BalanceContext.Provider value={{ balance, updateBalance, selectedSessionPrice, updateSelectedSessionPrice }}>
      <Box sx={{ flex: 1, display: "flex" }}>
        <Layout defaultRout="/client/home" navItems={navItems} />
      </Box>
    </BalanceContext.Provider>
  );
};

export default ClientLayout;
