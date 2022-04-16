const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertInvoice = async (param) => {
  const { orderId, tableId, createAt, updateAt } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `INSERT INTO invoice (orderId, tableId, createAt, updateAt) VALUES ('${orderId}', '${tableId}', '${createAt}', '${updateAt}')`;
  const result = await db.query(query);
  return result;
};

const deleteInvoice = async (param) => {
  const { id } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `DELETE FROM invoice WHERE invoice.id = ${id}`;
  const result = await db.query(query);
  return result;
};

const updateInvoice = async (param) => {
  const [{ productId, namaProduct, qty, categoryProduct, customerName, customerContact }] = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `UPDATE invoice SET productId = '${productId}', namaProduct = '${namaProduct}', `;
  const result = await db.query(query, [param]);
  return result;
};


module.exports = {
  insertInvoice,
  deleteInvoice,
  updateInvoice
};