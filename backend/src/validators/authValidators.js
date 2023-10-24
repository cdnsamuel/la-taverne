const joi = require("joi");

const connexionSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().min(6).required(),
});

const inscriptionSchema = joi.object({
  nickname: joi.string().min(4).required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().min(6).required(),
  passwordcheck: joi.ref("password"),
  invitation: joi.string().min(6).required(),
});

module.exports = { connexionSchema, inscriptionSchema };
