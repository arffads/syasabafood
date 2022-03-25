const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const listProduct = async (params) => {
  const startDate = params ? params.startDate : null;
  const endDate = params ? params.endDate : null;
  let withDate = '';

  if (startDate && endDate) {
    withDate = `WHERE products.create_at >= '${startDate}' AND products.create_at <= '${endDate}' + interval 1 DAY ORDER BY products.create_at ASC`;
  }
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT * FROM products`;
  const result = await db.query(query);
  return result;
};

const findProductByDate = async (param) => {
  const { startDate, endDate } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT * FROM products WHERE create_at => '${startDate}' AND update_at <= '${endDate}' + interval 1 DAY ORDER BY products.created_at ASC `;
  const result = await db.query(query);
  return result;
};

const findProductByCategory = async (param) => {
  const { categoryId } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT * FROM products WHERE products.category_id = '${categoryId}' ORDER BY products.create_at ASC`;
  const result = db.query(query);
  return result;
};

const findProductById = async (param) => {
  const { id } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT * FROM products WHERE products.id ='${id}'`;
  const result = db.query(query);
  return result;
}


module.exports = {
  listProduct,
  findProductByCategory,
  findProductByDate,
  findProductById
};
