const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const listOrder = async (param) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT * FROM orders`;
  const result = await db.query(query);
  return result;
};

const findOrderByTable = async (param) => {
  const {  } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = ``;
  const result = await db.query(query);
  return result;
};

const findOrderByDate = async (param) => {
  const {  } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = ``;
  const result = await db.query(query);
  return result;
};

module.exports = {
  listOrder,
  findOrderByDate,
  findOrderByTable
};