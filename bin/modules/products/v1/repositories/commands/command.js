const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertOneProduct = async (param) => {
  const { namaProduk, hargaProduk, discount = 0, isActive, createAt, updateAt, categoryId, userId } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO products (id, name, price, discount, isActive, create_at, update_at, category_id, user_id) VALUES ('NULL', '${namaProduk}', '${hargaProduk}', '${discount}', '${isActive}', '${createAt}', '${updateAt}','${categoryId}', '${userId}')`;
  const result = await db.query(query);
  return result;
};

const deleteProduct = async (param) => {
  const { id } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `DELETE FROM products WHERE products.id = ${id}`;
  const result = await db.query(query, [param]);
  return result;
};

const updateProduct = async (param) => {
  const { id, namaProduk, hargaProduk, discount = 0, isActive, createAt, updateAt, categoryId } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `UPDATE products SET name = '${namaProduk}', price = '${hargaProduk}', discount = '${discount}', isActive = '${isActive}', create_at = '${createAt}', update_at = '${updateAt}', category_id = '${categoryId}' WHERE products.id = ${id}`;
  const result = await db.query(query, [param]);
  return result;
};

module.exports = {
  insertOneProduct,
  deleteProduct,
  updateProduct
};