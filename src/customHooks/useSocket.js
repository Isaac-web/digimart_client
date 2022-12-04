import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  const socketInitialized = useRef(false);
  useEffect(() => {
    if (!socketInitialized.current) {
      setSocket(io(process.env.REACT_APP_SOCKET_URI));
      socketInitialized.current = true;
    }
  }, []);

  return socket;
};

export default useSocket;
