import { useState } from "react";
import PropTypes from "prop-types";

function MessageInput({ socket }) {
  const [message, setMessage] = useState("");

  const handleInput = (evt) => {
    setMessage(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { message });

    setMessage("");
  };

  return (
    <div className="flex items-end ">
      <form
        onSubmit={handleSubmit}
        className="flex-grow flex items-end gap-4 m-4"
      >
        <textarea
          name="message"
          id="message"
          value={message}
          onChange={handleInput}
          className="textarea textarea-lg bg-secondary bg-opacity-40 flex-grow font-poppins text-accent"
        />
        <button type="submit" className="btn btn-secondary">
          Envoyer
        </button>
      </form>
    </div>
  );
}

MessageInput.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
  }).isRequired,
};

export default MessageInput;
