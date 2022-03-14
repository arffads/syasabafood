const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertOneTable = async (param) => {
  const { noMeja, userId } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO food_tables (id, no_meja, userId) VALUES (NULL, '${noMeja}', '${userId}')`;
  const result = await db.query(query);
  return result;
};

const updateTable = async (param) => {

};

const deleteTable = async (param) => {
  const {id} = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT INTO tables WHERE tables.id = ${id}`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  updateTable,
  insertOneTable,
  deleteTable
};