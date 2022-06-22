const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const listInvoice = async (param) => {
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT invoice.*, products.name as namaProduct, products.price as hargaProduct, orders.tableId as tableId, 
  orders.customerName as cutomer, orders.qty as quantity,orders.product_id as productId FROM invoice 
  LEFT JOIN orders ON invoice.orderId = orders.id LEFT JOIN products ON invoice.orderId = products.id`;
  const result = await db.query(query);
  return result;
};

const listInvoiceByTable = async (param) => {
  const {tableId} = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT * FROM invoice WHERE tableId = '${tableId}' `;
  const result = await db.query(query);
  return result;
}


module.exports = {
  listInvoice,
  listInvoiceByTable
};