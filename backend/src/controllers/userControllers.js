// Import access to database tables
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const item = req.body;

  try {
    const insertId = await tables.item.create(item);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  add,
};
