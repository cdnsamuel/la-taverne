import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function UserList({ socket }) {
  const [users, setUsers] = useState({});

  useEffect(() => {
    if (socket) {
      socket.on("userConnected", (user) => {
        setUsers(user);
      });

      socket.on("userDisconnected", (userId) => {
        setUsers((current) => {
          const copy = { ...current };
          delete copy[userId];
          return copy;
        });
      });
    }
  }, [socket]);

  return (
    <div className="flex flex-col lg:justify-start justify-end rounded-xl mt-4 mx-4">
      <h3 className="bg-primary font-lobster text-xl p-2 text-white rounded-t-xl">
        Utilisateurs connectés
      </h3>
      <div className="p-2 font-poppins text-lg bg-secondary  ">
        {Object.values(users).map((elem, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className={`flex flex-col `}>
            <p>{elem}</p>
          </div>
        ))}
      </div>
      <div className="h-4 bg-primary rounded-b-xl" />
    </div>
  );
}

UserList.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserList;
