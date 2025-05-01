import React, { useEffect, useState } from "react";
import useSocket from "../../../hooks/use-socket";

const DoctorChat = () => {
  const currentUser = localStorage.getItem("user"); // الحصول على بيانات المستخدم من localStorage
  const userId = currentUser ? JSON.parse(currentUser).id : null; // التأكد من وجود userId في localStorage
  const socket = useSocket(userId); // استخدام useSocket بدون تمرير userId لأنه ليس مطلوبًا هنا بشكل خاص

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!socket || !userId) return; // التأكد من وجود socket و userId قبل المتابعة

    // استقبال الرسائل عند إرسالها
    socket.on("message", (data: { from: string; message: string }) => {
      setMessages((prev) => [...prev, `From ${data.from}: ${data.message}`]);
    });

    // إرسال رسالة إلى الطبيب عند الإتصال
    socket.emit("join", userId); // يجب إرسال userId أو الطبيبId للانضمام إلى غرفة الطبيب

    // تنظيف الحدث عند إلغاء الاشتراك
    return () => {
      socket.off("message"); // إزالة الحدث عند انتهاء استخدام الـ component
    };
  }, [socket, userId]);

  return (
    <div>
      <h2>Doctor's Inbox</h2>
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
};

export default DoctorChat;
