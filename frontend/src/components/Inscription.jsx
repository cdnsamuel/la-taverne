import PropTypes from "prop-types";
import { useState } from "react";

import backendApi from "../services/backendApi";
import matchEmail from "../services/matchEmail";

function Inscription({ toggle }) {
  const [errors, setErrors] = useState([]);

  const [fields, setFields] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordcheck: "",
    invitation: "",
  });

  const handleFields = (evt) => {
    setFields({ ...fields, [evt.target.id]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const problems = [];
    if (fields.nickname.length < 4) problems.push("Pseudonyme trop court");
    if (!matchEmail(fields.email)) problems.push("Email mal formaté");
    if (fields.password.length < 6) problems.push("Mot de passe trop court");
    if (fields.password !== fields.passwordcheck)
      problems.push("Le mots de passes ne correspondent pas");
    if (fields.invitation.length < 6) problems.push("Invitation trop courte");

    if (!problems.length) {
      try {
        const userInscription = await backendApi.post(
          "/api/inscription",
          fields
        );

        if (userInscription.status === 201) {
          toggle();
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
            <li key={msg}>{`- ${msg}`}</li>
          ))}
        </ul>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 text-acent text-2xl text-accent font-lobster2"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="nickname">Pseudonyme :</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            minLength="4"
            required
            className="input input-accent  shadow-md"
            onChange={handleFields}
            value={fields.nickname}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            id="email"
            name="email"
            minLength="6"
            required
            className="input input-accent  shadow-md"
            onChange={handleFields}
            value={fields.email}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength="6"
            required
            onChange={handleFields}
            value={fields.password}
            className="input input-accent  shadow-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="passwordcheck">Vérification :</label>
          <input
            type="password"
            id="passwordcheck"
            name="passwordcheck"
            className="input input-accent  shadow-md"
            onChange={handleFields}
            value={fields.passwordcheck}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="invitation">Code d'invitation :</label>
          <input
            type="text"
            id="invitation"
            name="invitation"
            minLength="6"
            required
            className="input input-accent  shadow-md"
            onChange={handleFields}
            value={fields.invitation}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary normal-case text-2xl shadow-lg"
        >
          Inscription
        </button>
      </form>
      <div className="w-full flex justify-around items-center mt-6">
        <p>Déjà membre?</p>
        <button
          type="button"
          onClick={toggle}
          className="btn btn-sm btn-accent"
        >
          se connecter
        </button>
      </div>
    </div>
  );
}

Inscription.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Inscription;
