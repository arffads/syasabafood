const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');


const insertOrder = async (param) => {
  const { tableId, noMeja, productId,  qty, namaProduct, categoryProduct, customerName, customerContact } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO orders (id, tableId, no_meja, productId, qty, namaProduct, categoryProduct, customerName, customerContact) VALUES (NULL, '${tableId}', '${noMeja}', '${productId}',  '${qty}', '${namaProduct}', '${categoryProduct}', '${customerName}', '${customerContact}')`;
  const result = await db.query(query, [param]);
  return result;
};

const addOrder = async () => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO orders SELECT * FROM products WHERE products.id`;
  const result = await db.query(query);
  return result;
}

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
  addOrder,
  insertOrder,
  deleteOrder,
  updateOrder
};