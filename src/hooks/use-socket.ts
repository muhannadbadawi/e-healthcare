// src/hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (serverUrl: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketConnection = io(serverUrl, {
      transports: ['websocket'], // use websocket only for better performance
      withCredentials: true,      // Ensure that cookies are sent
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, [serverUrl]);

  return socket;
};

export default useSocket;
