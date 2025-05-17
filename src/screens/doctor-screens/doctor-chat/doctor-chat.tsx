import React, { useEffect, useState } from "react";
import useSocket from "../../../hooks/use-socket";
import { useLocation } from "react-router-dom";

const DoctorChat = () => {
  const currentUser = localStorage.getItem("user"); // الحصول على بيانات المستخدم من localStorage
  const userId = currentUser ? JSON.parse(currentUser).id : null; // التأكد من وجود userId في localStorage
  const socket = useSocket(userId); // استخدام useSocket بدون تمرير userId لأنه ليس مطلوبًا هنا بشكل خاص
  const location = useLocation();
  const { state } = location; // This will contain `clientIdRequest`

  const [messages, setMessages] = useState<string[]>([]);
  console.log("messages: ", messages);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (!socket || !userId) return;
    socket.emit("setBusy");

    socket.on("message", (data: { from: string; message: string }) => {
      // إضافة بعض المنطق لتمييز الرسائل الواردة من العميل أو الطبيب
      setMessages((prev) => [
        ...prev,
        data.message,
      ]);
    });

    socket.emit("join", userId);

    return () => {
      socket.off("message");
    };
  }, [socket, userId]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      // إرسال رسالة من الطبيب إلى العميل
      socket?.emit("privateMessage", {
        recipientId: state, // أو الطبيبId إن كان يختلف
        message: newMessage,
      });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        // background: "red",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flexDirection:"column"
      }}
    >
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div style={{ display: "flex", width: "100%", gap: 5 }}>
        <input
          style={{ width: "100%", padding: 5, borderRadius: 10 }}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default DoctorChat;
