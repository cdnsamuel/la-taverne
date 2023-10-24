import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const memoizedUser = useMemo(() => {
    return { user, setUser };
  }, [user]);

  return (
    <UserContext.Provider value={memoizedUser}>{children}</UserContext.Provider>
  );
}
UserContextProvider.propTypes = {
  children: PropTypes.node,
};
UserContextProvider.defaultProps = {
  children: "",
};
