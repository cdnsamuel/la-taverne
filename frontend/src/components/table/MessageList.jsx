import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useUserContext } from "../../contexts/UserContext";

function MessageList({ socket }) {
  const { user } = useUserContext();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("Message", (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [messages, socket]);

  return (
    <div className="h-[75%] overflow-scroll- flex flex-col justify-end  bg-accent bg-opacity-20 mt-4 mx-4 px-10 pb-4 rounded-xl">
      {messages.map((message, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={`chat ${
            user.nickname === message.author ? "chat-end" : "chat-start"
          } `}
        >
          <p className="chat-header text-xl">{message.author}</p>
          <p
            className={`chat-bubble text-2xl  ${
              user.nickname === message.author
                ? "chat-bubble-primary"
                : "chat-bubble-secondary"
            } `}
          >
            {message.message}
          </p>
        </div>
      ))}
    </div>
  );
}

MessageList.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
  }).isRequired,
};

export default MessageList;
