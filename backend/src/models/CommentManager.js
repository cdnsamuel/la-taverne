const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  async readAll(postId) {
    const [rows] = await this.database.query(
      `select c.id, c.post_id postId, c.user_id userId, c.content, c.creation, u.nickname from ${this.table} c join user u on u.id = c.user_id where post_id = ? order by c.creation desc`,
      [postId]
    );

    return rows;
  }

  async postOne({ postId, userId, content }) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (post_id, user_id, content) VALUES (?,?,?)`,
      [postId, userId, content]
    );

    return rows;
  }

  async putOne(content, id) {
    const [rows] = await this.database.query(
      `update ${this.table} set content = ? where id = ?`,
      [content, id]
    );

    return rows;
  }

  async deleteOne(id) {
    const [rows] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return rows;
  }
}

module.exports = PostManager;
