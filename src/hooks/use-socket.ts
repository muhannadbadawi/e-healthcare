// src/hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (userId?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const serverUrl = "http://127.0.0.1:3000";

  useEffect(() => {
    if (!userId) return; // لا تعمل اتصال بدون userId

    const socketConnection = io(serverUrl, {
      transports: ["websocket"],
      withCredentials: true,
      query: { userId }, // نرسل userId للسيرفر عند الاتصال
    });
    console.log("socketConnection: ", socketConnection);

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, [serverUrl, userId]);

  return socket;
};

export default useSocket;
