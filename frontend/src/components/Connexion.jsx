import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useUserContext } from "../contexts/UserContext";

import backendApi from "../services/backendApi";
import matchEmail from "../services/matchEmail";

function Connexion({ toggle }) {
  const navigate = useNavigate();

  const { setUser } = useUserContext();

  const [errors, setErrors] = useState([]);

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleFields = (evt) => {
    setFields({ ...fields, [evt.target.id]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const problems = [];

    if (!matchEmail(fields.email)) problems.push("Email mal formaté");
    if (fields.password.length < 6) problems.push("Mot de passe trop court");

    if (!problems.length) {
      try {
        const userConnexion = await backendApi.post("/api/connexion", fields);

        if (userConnexion.status === 200) {
          setUser(userConnexion.data);
          localStorage.setItem("user", JSON.stringify(userConnexion.data));
          navigate("/comptoir");
        }
      } catch (err) {
        console.error(err);
        problems.push(err.data.message);
      }
    }

    setErrors(problems);
  };

  return (
    <div className="bg-secondary lg:w-7/12 w-10/12 p-8 rounded-xl shadow-lg">
      {Boolean(errors.length) && (
        <ul className="flex flex-col gap-1 bg-error p-3 rounded-xl text-secondary mb-3">
          {errors.map((msg) => (
            <li>{`- ${msg}`}</li>
          ))}
        </ul>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-acent text-2xl text-accent"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-lobster2">
            Email :
          </label>
          <input
            type="text"
            id="email"
            name="email"
            minLength="6"
            required
            className={`input input-accent  shadow-md ${
              matchEmail(fields.email)
                ? "border-success focus:border-success"
                : "border-error"
            }`}
            value={fields?.email}
            onChange={handleFields}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-lobster2">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            minLength="6"
            required
            className="input input-accent  shadow-md"
            value={fields?.password}
            onChange={handleFields}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary font-lobster2 normal-case text-2xl shadow-lg"
        >
          Se connecter
        </button>
      </form>
      <div className="w-full flex justify-around items-center mt-6">
        <p>Pas encore membre?</p>
        <button
          type="button"
          onClick={toggle}
          className="btn btn-sm btn-accent"
        >
          S'inscrire
        </button>
      </div>
    </div>
  );
}

Connexion.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Connexion;
