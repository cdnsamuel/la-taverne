const joi = require("joi");

const commentSchema = joi.object({
  postId: joi.number().required(),
  userId: joi.number().required(),
  content: joi.string().min(4).required(),
});

const commentUpdateSchema = joi.object({
  content: joi.string().min(4).required(),
});

module.exports = { commentSchema, commentUpdateSchema };
