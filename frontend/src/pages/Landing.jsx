import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Connexion from "../components/Connexion";
import Inscription from "../components/Inscription";
import { useUserContext } from "../contexts/UserContext";

function Landing() {
  const { user } = useUserContext();

  const navigate = useNavigate();

  const [toggleForm, setToggleForm] = useState(false);

  const handleToggle = () => {
    setToggleForm(!toggleForm);
  };

  useEffect(() => {
    if (user) navigate("/comptoir");
  }, []);

  return (
    <div className="flex-grow flex flex-col  justify-evenly items-center">
      {toggleForm ? (
        <Inscription toggle={handleToggle} />
      ) : (
        <Connexion toggle={handleToggle} />
      )}
      {!toggleForm && (
        <>
          <img
            src="/assets/waitress.svg"
            alt="logo la taverne"
            className="lg:hidden h-52"
          />
          <img
            src="/assets/waitressBig.svg"
            alt="logo la taverne"
            className="lg:flex hidden h-80"
          />
        </>
      )}
    </div>
  );
}

export default Landing;
