// src/components/ChatTimer.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
} from "@mui/material";
import { useSocketContext } from "../../../components/SocketContext";
import { rateDoctor } from "../../../api/clientService";

const ChatTimer = ({ doctorId, role, roomName }: { doctorId: string, role: string, roomName: string }) => {
  const [seconds, setSeconds] = useState(0);
  const [endChatDialogOpen, setEndChatDialogOpen] = useState(false);
  const [rateDialogOpen, setRateDialogOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const { socket } = useSocketContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    if (socket) {
      socket.on("leftRoom", () => {
        handleEndChat();
      });
    }
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleRateDialogOpen = () => {
    setRateDialogOpen(true);
  };
  const handleRateDialogClose = () => {
    setRateDialogOpen(false);
    window.history.back();
  };
  const submitRating = async () => {
    await rateDoctor(doctorId as string, rating);
    handleRateDialogClose();
  };
  const handleEndChat = () => {
    if (role === "doctor") {
      socket?.emit("setOnline");
      window.history.back();
    } else {
      handleRateDialogOpen();
    }
  };

  const handleEndChatClick = () => {
    socket?.emit("leave", { roomName, seconds });
    setEndChatDialogOpen(false);
    handleEndChat();
  };
  return (
    <Box>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Chat Time: {formatTime(seconds)}
      </Typography>
      <Button
        onClick={() => setEndChatDialogOpen(true)}
        color="error"
        variant="outlined"
      >
        End Chat
      </Button>
      <Dialog
        open={endChatDialogOpen}
        onClose={() => setEndChatDialogOpen(false)}
      >
        <DialogTitle>End Chat</DialogTitle>
        <DialogContent>Are you sure you want to end the chat?</DialogContent>
        <DialogActions>
          <Button onClick={() => setEndChatDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEndChatClick}
            color="error"
            variant="contained"
          >
            End Chat
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={rateDialogOpen}
        onClose={handleRateDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Rate the Doctor</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <span>Please rate your consultation experience:</span>
            </Box>
            <Rating
              name="doctor-rating"
              value={rating}
              precision={0.5}
              onChange={(_, newValue) => {
                setRating(newValue ?? 0);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRateDialogClose}>Cancel</Button>
          <Button
            onClick={submitRating}
            variant="contained"
            color="primary"
            disabled={rating === 0}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatTimer;
