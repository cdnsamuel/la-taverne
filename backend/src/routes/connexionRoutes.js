const express = require("express");

const router = express.Router();

const {
  validConnexion,
  checkUserExist,
  tokenConnexion,
  logOut,
} = require("../middlewares/connexion");

router.post("/", validConnexion, checkUserExist, tokenConnexion);
router.get("/ciao", logOut);

module.exports = router;
