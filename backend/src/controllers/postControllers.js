// Import access to database tables
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const posts = await tables.post.readAll();

    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const post = req.body;

  try {
    const { insertId } = await tables.post.postOne(post);
    res.status(201).send({ insertId, message: "Post créé avec succès" });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const { affectedRows } = await tables.post.putOne(title, content, id);

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
    const { affectedRows } = await tables.post.deleteOne(id);

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
  browse,
  add,
  edit,
  destroy,
};
