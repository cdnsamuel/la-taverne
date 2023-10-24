import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUserContext } from "../contexts/UserContext";

import MessageList from "../components/table/MessageList";
import MessageInput from "../components/table/MessageInput";
import UserList from "../components/table/UserList";

function Table() {
  const { user } = useUserContext();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketio = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(socketio);

    socketio.on("connect", () => {
      socketio.emit("newUser", user.nickname);
    });

    return () => {
      socketio.disconnect();
    };
  }, []);

  return (
    <div className="flex-grow flex flex-col lg:flex-row-reverse">
      <UserList socket={socket} />
      <div className="flex-grow flex flex-col justify-end">
        <MessageList socket={socket} />
        <MessageInput socket={socket} />
      </div>
    </div>
  );
}

export default Table;
