const tables = require("../tables");

const { verify } = require("../services/argon");
const { encodeJwt } = require("../services/jsonwebtoken");

const { connexionSchema } = require("../validators/authValidators");

const validConnexion = (req, res, next) => {
  const { error } = connexionSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

const checkUserExist = async (req, res, next) => {
  try {
    const [user] = await tables.user.getByEmail(req.body.email);

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).send({ message: "Utilisateur non trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

const tokenConnexion = async (req, res) => {
  const passwordChecked = await verify(req.user.password, req.body.password);

  if (passwordChecked) {
    delete req.body;
    delete req.user.password;

    const token = encodeJwt({ id: req.user.id, roles: req.user.roles });
    res.cookie("auth_token", token, { httpOnly: true, secure: false });

    res.status(200).send(req.user);
  } else {
    res.status(403).send({ message: "Mauvais mot de passe" });
  }
};

const logOut = (req, res) => {
  res.clearCookie("auth_token");
  res.status(200).send({ message: "Deconnexion effectuée avec succès" });
};

module.exports = {
  validConnexion,
  checkUserExist,
  tokenConnexion,
  logOut,
};
