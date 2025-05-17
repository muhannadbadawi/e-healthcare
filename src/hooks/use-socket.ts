// src/hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://127.0.0.1:3000";

let socketInstance: Socket | null = null;

const useSocket = (userId?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    if (!socketInstance) {
      socketInstance = io(SOCKET_URL, {
        transports: ["websocket"],
        withCredentials: true,
        query: { userId },
      });

      console.log("✅ socket created");
    } else {
      console.log("♻️ using existing socket");
    }

    setSocket(socketInstance);

    return () => {
      // لا تفصل الاتصال هنا، خلي connection واحدة شغالة طول ما المستخدم موجود
      // socketInstance?.disconnect(); ❌
      // فقط نظف الـ listeners من هذا ال component
    };
  }, [userId]);

  return socket;
};

export default useSocket;
