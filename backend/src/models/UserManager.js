const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select * from ${this.table} order by creation desc`
    );

    return rows;
  }

  async getByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    return rows;
  }

  async postOne({ nickname, email, password }) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (nickname, email, password) VALUES (?,?,?)`,
      [nickname, email, password]
    );

    return rows;
  }
}

module.exports = UserManager;
