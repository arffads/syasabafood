const Mysql = require("../../../../../infrastructure/database/mysql/db");
const configs = require("../../../../../infrastructure/configs/global_config");

const findTable = async (param) => {
  const {no_meja} = param
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `SELECT * FROM food_tables WHERE no_meja = "${no_meja}" LIMIT 1`;
  const result = await db.query(query);
  return result;
};

const listTable = async () => {
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = "SELECT id, no_meja FROM food_tables";
  const result = await db.query(query);
  return result;
};

module.exports = {
  listTable,
  findTable,
};
