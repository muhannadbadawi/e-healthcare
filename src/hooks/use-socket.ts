// src/hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://127.0.0.1:3000";

const useSocket = (userId?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socketClient = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
      query: { userId },
    });

    setSocket(socketClient);

    return () => {
      socketClient.disconnect();
    };
  }, [userId]);

  return socket;
};

export default useSocket;
