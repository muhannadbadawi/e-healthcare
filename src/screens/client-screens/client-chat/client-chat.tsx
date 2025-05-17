import React, { useEffect, useState } from "react";
import useSocket from "../../../hooks/use-socket"; // استيراد هوك useSocket
import { useParams } from "react-router-dom";

const ClientChat = () => {
  const { doctorId } = useParams<{ doctorId: string }>(); // تأكد من تحديد النوع بشكل صحيح
  const currentUser = localStorage.getItem("user"); // الحصول على بيانات المستخدم من localStorage
  const userId = currentUser ? JSON.parse(currentUser).id : null; // التأكد من وجود userId في localStorage

  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // استخدام هوك useSocket للاتصال بالخادم
  const socket = useSocket(userId); // استدعاء هوك useSocket

  useEffect(() => {
    if (!socket || !userId) return;

    socket.on("message", (data: { from: string; message: string }) => {
      // إضافة بعض المنطق لتمييز الرسائل الواردة من العميل أو الطبيب
      setMessages((prev) => [
        ...prev,
        `${data.from === userId ? "You" : "Doctor"}: ${data.message}`,
      ]);
    });

    socket.emit("join", userId);

    return () => {
      socket.off("message");
    };
  }, [socket, userId]);


const sendMessage = () => {
  if (newMessage.trim() !== "") {
    socket?.emit("privateMessage", {
      recipientId: doctorId,
      message: newMessage,
    });

    setMessages((prevMessages) => [...prevMessages, `You: ${newMessage}`]);
    setNewMessage("");
  }
};

  return (
    <div>
      <div>
        <h2>Chat with Doctor</h2>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
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

export default ClientChat;
