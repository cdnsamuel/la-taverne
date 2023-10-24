// Import access to database tables
const tables = require("../tables");

const read = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await tables.comment.readAll(postId);
    res.status(200).send(comments);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const comment = req.body;

  try {
    const { insertId } = await tables.comment.postOne(comment);
    res.status(201).send({ insertId, message: "Post créé avec succès" });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const { affectedRows } = await tables.comment.putOne(content, id);

    if (affectedRows) {
      res.status(201).send({ message: "Édité avec succès" });
    } else {
      res.status(400).send({ message: "Erreur lors de l'édition" });
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { affectedRows } = await tables.comment.deleteOne(id);

    if (affectedRows) {
      res.status(204).send({ message: "Supprimé avec succès" });
    } else {
      res.status(400).send({ message: "Erreur lors de la suppression" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
  add,
  edit,
  destroy,
};
