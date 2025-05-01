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
    if (!socket) return;
    // console.log("socket: ", socket);

    // الانضمام إلى غرفة المحادثة الخاصة بالطبيب عند تحميل الصفحة
    socket.emit("join", doctorId);

    // استقبال الرسائل
    socket.on("message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // التنظيف عند فك الاتصال
    return () => {
      socket.off("message");
    };
  }, [doctorId, socket]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      console.log("doctorId: ", doctorId);

      socket?.emit("privateMessage", {
        recipientId: doctorId,
        message: newMessage,
      }); // إرسال الرسالة عبر WebSocket
      setMessages((prevMessages) => [...prevMessages, newMessage]);
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
