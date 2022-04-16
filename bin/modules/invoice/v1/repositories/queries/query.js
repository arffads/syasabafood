const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const listInvoice = async (param) => {
  console.log(param ,'param nihhh')
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT invoice.*, products.name as namaProduct, products.price as hargaProduct, orders.tableId as tableId, 
  orders.customerName as cutomer, orders.qty as quantity,orders.product_id as productId FROM invoice 
  LEFT JOIN orders ON invoice.orderId = orders.id LEFT JOIN products ON invoice.orderId = products.id`;
  console.log(query, 'query ni boss')
  const result = await db.query(query);
  return result;
};

const listInvoiceByTable = async (param) => {
  const {tableId} = param;
  console.log(param, 'inih param')
  const db = new Mysql(configs.get('/mysqlConfig'));
  const query = `SELECT invoice.*,  FROM invoice WHERE invoice.tableId = '${tableId}' `;
  const result = await db.query(query);
  return result;
}


module.exports = {
  listInvoice,
  listInvoiceByTable
};