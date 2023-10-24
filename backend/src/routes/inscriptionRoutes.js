const express = require("express");

const router = express.Router();

const {
  validInscription,
  checkUserFree,
  registerUser,
} = require("../middlewares/inscription");

router.post("/", validInscription, checkUserFree, registerUser);

module.exports = router;
