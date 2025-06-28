// src/context/SocketContext.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://127.0.0.1:3000";

interface SocketContextValue {
  socket: Socket | null;
  doctorStatuses: Record<string, DoctorStatus>;
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  doctorStatuses: {},
});
export const useSocketContext = () => useContext(SocketContext);

interface SocketProviderProps {
  userId?: string;
  children: ReactNode;
}
type DoctorStatus = "online" | "offline" | "busy";

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [showSessionPriceDialog, setShowSessionPriceDialog] = useState(false);
  const [sessionPrice, setSessionPrice] = useState<number | "">("");
  const [error, setError] = useState("");

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [doctorStatuses, setDoctorStatuses] = useState<
    Record<string, DoctorStatus>
  >({});

  useEffect(() => {
    if (!user.id) return;

    const socketClient = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
      query: { userId: user.id },
    });

    setSocket(socketClient);

    socketClient.emit("getDoctorStatuses");

    socketClient.on(
      "allDoctorStatuses",
      (
        doctors: {
          doctorId: string;
          name: string;
          specialty: string;
          status: DoctorStatus;
        }[]
      ) => {
        const statusMap: Record<string, DoctorStatus> = {};
        for (const doc of doctors) {
          statusMap[doc.doctorId] = doc.status;
        }
        setDoctorStatuses(statusMap);
      }
    );

    console.log("✅ Socket connected");

    // تنظيف الاتصال عند فك الاشتراك
    return () => {
      socketClient.disconnect();
      console.log("❌ Socket disconnected");
    };
  }, [user.id]);

  useEffect(() => {
    if (!socket) return;
    if (!user.id) return;
    if (user.role !== "client") return;

    socket.on(
      "doctorStatusUpdate",
      (data: { doctorId: string; status: DoctorStatus }) => {
        setDoctorStatuses((prev) => ({
          ...prev,
          [data.doctorId]: data.status,
        }));
      }
    );

    return () => {
      socket.off("doctorStatusUpdate");
    };
  }, [socket]);
  const handleSaveSessionPrice = () => {
    if (!sessionPrice || sessionPrice <= 0) {
      setError("Please enter a valid price greater than 0.");
      return;
    }

    // You can make an API call here to save it in your backend
    const updatedUser = { ...user, sessionPrice };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setShowSessionPriceDialog(false);
    setError("");
    console.log("✅ Session price saved:", sessionPrice);
  };
  return (
    <SocketContext.Provider value={{ socket, doctorStatuses }}>
      {children}
      <Dialog open={showSessionPriceDialog} disableEscapeKeyDown>
        <DialogTitle>Set Your Session Price</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Please set your session price to start accepting clients.
          </Typography>
          <TextField
            type="number"
            label="Session Price (JOD)"
            fullWidth
            margin="dense"
            value={sessionPrice}
            onChange={(e) => setSessionPrice(Number(e.target.value))}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveSessionPrice}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </SocketContext.Provider>
  );
};
