const joi = require("joi");

const postSchema = joi.object({
  title: joi.string().min(4).required(),
  content: joi.string().min(6).required(),
  userId: joi.number().required(),
});

const postUpdateSchema = joi.object({
  title: joi.string().min(4).required(),
  content: joi.string().min(6).required(),
});

module.exports = { postSchema, postUpdateSchema };
