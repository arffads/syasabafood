const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertOneTable = async (param) => {
  const { noMeja, userId, password } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO food_tables (id, no_meja, userId, password) VALUES (NULL, '${noMeja}', '${userId}', '${password}')`;
  const result = await db.query(query);
  return result;
};

// const updateTable = async (param) => {
//   const { id, noMeja, password } = param;
//   const db = new Mysql(configs.get('/configConfig'));
//   let query;
//   if (password ) {
//     query = `UPDATE food_tables SET no_meja = '${noMeja}', password = '${password}' WHERE food_tables.id = '${id}'`;
//   } else {
//     query = `UPDATE food_tables SET no_meja = '${noMeja}'WHERE food_tables.id = '${id}'`;
//   }
//   const result = await db.query(query, [param]);
//   return result;
// };

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