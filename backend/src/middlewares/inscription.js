const tables = require("../tables");

const { hash } = require("../services/argon");
const { inscriptionSchema } = require("../validators/authValidators");

const validInscription = (req, res, next) => {
  const { error } = inscriptionSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

const checkUserFree = async (req, res, next) => {
  try {
    const [user] = await tables.user.getByEmail(req.body.email);

    if (user) {
      res.status(400).send({ message: "Cet utilisateur existe déjà" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const currentInvitation = await tables.invitation.readLast();

    if (req.body.invitation === currentInvitation.code) {
      delete req.body.passwordcheck;
      const hashedPassword = await hash(req.body.password);

      req.body.password = hashedPassword;

      const registeredUser = await tables.user.postOne(req.body);

      if (registeredUser.affectedRows === 1) {
        res.status(201).send({ message: "Utilisateur crée avec succès" });
      }
    } else {
      res.status(400).send({ message: "C'est pas le bon code, intrus !" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validInscription,
  checkUserFree,
  registerUser,
};
