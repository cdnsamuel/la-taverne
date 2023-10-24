import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Comptoir from "../pages/Comptoir";
import Table from "../pages/Table";
import Profil from "../pages/Profil";
import Admin from "../pages/Admin";
import Nope from "../components/structure/Nope";
import ProtectedRoute from "../components/structure/ProtectedRoute";
import { useUserContext } from "../contexts/UserContext";

function AppRoutes() {
  const { user } = useUserContext();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        element={<ProtectedRoute isAllowed={Boolean(user)} redirectPath="/" />}
      >
        <Route path="/comptoir" element={<Comptoir />} />
        <Route path="/table" element={<Table />} />
        <Route path="/profil" element={<Profil />} />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isAllowed={user?.roles.includes("admin")}
            redirectPath="/"
          />
        }
      >
        <Route path="/admin" element={<Admin />} />
      </Route>

      <Route path="*" element={<Nope />} />
    </Routes>
  );
}

export default AppRoutes;
