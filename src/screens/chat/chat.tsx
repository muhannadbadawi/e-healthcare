import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Paper,
} from "@mui/material";
import MyButton from "../../components/my-button";
import ImageIcon from "@mui/icons-material/Image";
import { useSocketContext } from "../../components/SocketContext";
import { useBalanceContext } from "../client-screens/client-layout";
import { Send } from "@mui/icons-material";
import ChatTimer from "./chat-timer/chat-timer";

interface Message {
  message: string;
  isMe: boolean;
}

const Chat = () => {
  const { doctorId, clientId } = useParams<{
    doctorId?: string;
    clientId?: string;
  }>();
  const himId = doctorId || clientId;
  const currentUser = localStorage.getItem("user");
  const parsedUser = currentUser ? JSON.parse(currentUser) : null;
  const userId = parsedUser?.id;
  const role = parsedUser?.role; // 'client' or 'doctor'

  const { socket } = useSocketContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { balance, updateBalance, selectedSessionPrice } = useBalanceContext();
  const roomName = role === "doctor" ? userId : doctorId;
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!socket || !userId) return;

    socket.emit("join", roomName);

    if (role === "doctor") {
      console.log("setBusy: ");

      socket.emit("setBusy");
    } else if (role === "client") {
      updateBalance((balance as number) - (selectedSessionPrice ?? 0));
    }
    socket.on("message", (data: { from: string; message: string }) => {
      setMessages((prev) => [
        ...prev,
        { message: data.message, isMe: data.from === userId },
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket, userId]);


  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !himId) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      socket?.emit("privateMessage", {
        recipientId: himId,
        message: `<img src="${base64Image}" alt="uploaded image" style="max-width: 200px;"/>`,
        isImage: true,
      });

      setMessages((prev) => [
        ...prev,
        {
          message: `<img src="${base64Image}" alt="uploaded image" style="max-width: 200px;"/>`,
          isMe: true,
        },
      ]);
    };

    reader.readAsDataURL(file);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    console.log("newMessage: ", newMessage);
    if (!himId) return;

    socket?.emit("privateMessage", {
      recipientId: himId,
      roomName: roomName,
      message: newMessage,
    });

    setMessages((prev) => [...prev, { message: newMessage, isMe: true }]);
    setNewMessage("");
    inputRef.current?.focus();
  };

  return (
    <Box
      sx={{
        height: "95%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1, alignItems: "center", gap: 2 }}>
        <ChatTimer doctorId={doctorId ?? ""} role={role} roomName={roomName}/>
      </Box>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f5f5f5",
          p: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mb: 2,
          }}
        >
          {messages.map((msg, index) => (
            <Paper
              key={index}
              sx={{
                alignSelf: msg.isMe ? "flex-end" : "flex-start",
                bgcolor: msg.isMe ? "#7b1fa2" : "#e0e0e0",
                color: msg.isMe ? "#fff" : "inherit",
                p: 1,
                px: 2,
                borderRadius: 2,
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: msg.message }} />
            </Paper>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />
          <MyButton
            variant="outlined"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon />
          </MyButton>
          <TextField
            inputRef={inputRef}
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Type your message"
            type="text"
            name="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newMessage.trim()) sendMessage();
            }}
          />

          <MyButton variant="contained" onClick={sendMessage}>
            <Send />
          </MyButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
