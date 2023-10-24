// Import access to database tables
const tables = require("../tables");

const vote = async (req, res, next) => {
  const { postId } = req.params;
  const { userId, upvote, downvote } = req.body;

  try {
    const verification = await tables.post_votes.verify(postId, userId);

    if (!verification.length) {
      const { affectedRows } = await tables.post_votes.insertion(
        postId,
        userId,
        upvote,
        downvote
      );
      res.status(201).send({ affectedRows, message: "Vote créé" });
    } else {
      const { affectedRows } = await tables.post_votes.update(
        postId,
        userId,
        upvote,
        downvote
      );
      res.status(201).send({ affectedRows, message: "Vote mis à jour" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  vote,
};
