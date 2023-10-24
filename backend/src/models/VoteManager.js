const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "post_votes" });
  }

  async verify(postId, userId) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where post_id = ? and user_id = ?`,
      [postId, userId]
    );

    return rows;
  }

  async insertion(postId, userId, upvote, downvote) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (post_id, user_id, upvote, downvote) values (?,?,?,?)`,
      [postId, userId, upvote, downvote]
    );

    return rows;
  }

  async update(postId, userId, upvote, downvote) {
    const [rows] = await this.database.query(
      `update ${this.table} set upvote = ?, downvote = ? where post_id = ? and user_id = ?`,
      [upvote, downvote, postId, userId]
    );

    return rows;
  }
}

module.exports = PostManager;
