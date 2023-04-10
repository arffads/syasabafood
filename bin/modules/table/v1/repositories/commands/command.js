const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertOneTable = async (param) => {
  const { noMeja, userId, password } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO food_tables (no_meja, userId, password) VALUES ('${noMeja}', '${userId}', '${password}')`;
  const result = await db.query(query);
  return result;
};


const deleteTable = async (param) => {
  const {id} = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `DELETE FROM food_tables WHERE food_tables.id = ${id}`;
  const result = await db.query(query, [param]);
  return result;
};

module.exports = {
  insertOneTable,
  deleteTable
};