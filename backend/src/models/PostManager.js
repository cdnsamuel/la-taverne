const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "post" });
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select p.id, p.user_id userId, p.title, p.content, p.creation, u.nickname,
      (select count(*) from comment where post_id = p.id) commentsCount,
      (select sum(upvote) from post_votes pv where pv.post_id = p.id) upvoteCount,
      (select sum(downvote) from post_votes pv where pv.post_id = p.id) downvoteCount
      from ${this.table} p 
      join user u on u.id = p.user_id 
      order by creation desc`
    );

    return rows;
  }

  async postOne({ title, content, userId }) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (title, content, user_id) VALUES (?,?,?)`,
      [title, content, userId]
    );

    return rows;
  }

  async putOne(title, content, id) {
    const [rows] = await this.database.query(
      `update ${this.table} set title = ?, content = ? where id = ?`,
      [title, content, id]
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
