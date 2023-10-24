import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext";

import backendApi from "../../services/backendApi";
import DesktopLinks from "./DesktopLinks";
import MobileLinks from "./MobileLinks";

function Header() {
  const navigate = useNavigate();

  const { setUser } = useUserContext();

  const logOut = async () => {
    try {
      const res = await backendApi.get("/api/connexion/ciao");
      if (res.status === 200) {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
    navigate("/");
  };

  return (
    <div className="w-full bg-primary flex items-center justify-between h-[10vh] min-h-[5rem] font-lobster text-white lg:text-5xl text-3xl p-2 lg:rounded-b-xl">
      <img
        src="/assets/tender.svg"
        alt="logo la taverne"
        className="h-[8vh] min-h-[5rem]"
      />
      <h2 className="mr-6">La Taverne</h2>
      <DesktopLinks logOut={logOut} />
      <MobileLinks logOut={logOut} />
    </div>
  );
}

export default Header;
