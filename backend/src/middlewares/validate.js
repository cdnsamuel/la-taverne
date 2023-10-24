const {
  postSchema,
  postUpdateSchema,
} = require("../validators/postValidators");
const {
  commentSchema,
  commentUpdateSchema,
} = require("../validators/commentValidators");

const newPost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

const updatePost = (req, res, next) => {
  const { error } = postUpdateSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

const newComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

const updateComment = (req, res, next) => {
  const { error } = commentUpdateSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

module.exports = { newPost, updatePost, newComment, updateComment };

// const validate = (schema) => {
//   (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     console.log(req.body);
//     if (error) {
//       next(error);
//     } else {
//       next();
//     }
//   };
// };
