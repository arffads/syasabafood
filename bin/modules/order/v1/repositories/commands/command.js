const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');


const insertOrder = async (param) => {
  const [{ noMeja, productId, tableId, qty, namaProduct, categoryProduct, customerName, customerContact }] = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO orders (id, noMeja, productId, tableId, qty, namaProduct, categoryProduct, customerName, customerContact) VALUES [(NULL, '${noMeja}', '${productId}', '${tableId}', '${qty}', '${namaProduct}', '${categoryProduct}', '${customerName}', '${customerContact}')]`;
  const result = await db.query(query, [param]);
  return result;
};

const deleteOrder = async (param) => {
  const { id } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `DELETE FROM orders WHERE orders.id = ${id}`;
  const result = await db.query(query);
  return result;
};

const updateOrder = async (param) => {
  const [{ productId, namaProduct, qty, categoryProduct, customerName, customerContact }] = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `UPDATE orders SET productId = '${productId}', namaProduct = '${namaProduct}', `;
  const result = await db.query(query, [param]);
  return result;
};


module.exports = {
  insertOrder,
  deleteOrder,
  updateOrder
};