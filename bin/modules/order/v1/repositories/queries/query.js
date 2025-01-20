const Mysql = require("../../../../../infrastructure/database/mysql/db");
const configs = require("../../../../../infrastructure/configs/global_config");

const listOrder = async (param) => {
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = ` SELECT * FROM orders ORDER BY id DESC`;
  const result = await db.query(query);
  return result;
};

const getOrderByOrderId = async (param) => {
  // const param;
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `SELECT * FROM orders WHERE orders.id = "${param}"`;
  const result = await db.query(query);
  // console.log(result,'AWAWAWAWAWA')
  return result;
};

const listOrderByStatusSuccess = async (param) => {
  const { order_id } = param;
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = ` SELECT * FROM orders JOIN detail_order ON detail_order.order_id = orders.id JOIN products ON detail_order.product_id = products.id WHERE orders.id = ${order_id} AND orders.status = "success" ORDER BY orders.create_at DESC`;
  const result = await db.query(query);
  return result;
};

const findOrderByOrderId = async (param) => {
  const { order_id } = param;
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `SELECT products.name, products.id, detail_order.qty, products.price FROM orders LEFT OUTER JOIN detail_order ON detail_order.order_id = orders.id LEFT OUTER JOIN products ON detail_order.product_id = products.id WHERE detail_order.order_id = "${order_id}"`;
  const result = await db.query(query);
  return result;
};

const listProduct = async (param) => {
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `SELECT * FROM products WHERE products.id`;
  const result = await db.query(query);
  return result;
};

const findOrderByDate = async (param) => {
  const { create_at } = param;
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `SELECT * FROM orders JOIN detail_order ON detail_order.order_id = orders.id JOIN products ON detail_order.product_id = products.id WHERE orders.create_at = "${create_at}"`;
  const result = await db.query(query);
  return result;
};

const findOrderByStatus = async (param) => {
  const { status } = param;
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `SELECT * FROM orders JOIN detail_order ON detail_order.order_id = orders.id JOIN products ON detail_order.product_id = products.id WHERE orders.status = "${status}"  ORDER BY orders.create_at DESC`;
  const result = await db.query(query);
  return result;
};

module.exports = {
  listOrder,
  findOrderByDate,
  findOrderByOrderId,
  listProduct,
  findOrderByStatus,
  listOrderByStatusSuccess,
  getOrderByOrderId
};
