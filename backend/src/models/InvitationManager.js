const AbstractManager = require("./AbstractManager");

class InvitationManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "invitation" });
  }

  // The C of CRUD - Create operation

  async create(invitation) {
    const [result] = await this.database.query(
      `insert into ${this.table} (code) values (?)`,
      [invitation.code]
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readLast() {
    const [rows] = await this.database.query(
      `select code from ${this.table} order by creation desc limit 1`
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(
      `select * from ${this.table} order by creation desc`
    );

    // Return the array of items
    return rows;
  }
}

module.exports = InvitationManager;
