const Mysql = require("../../../../../infrastructure/database/mysql/db");
const configs = require("../../../../../infrastructure/configs/global_config");

const insertOrder = async (param) => {
  const db = new Mysql(configs.get("/mysqlConfig"));
  const {
    tableId,
    noMeja,
    status,
    customerContact,
    customerName,
    total_price,
    payment_type,
    createAt,
    updateAt,
  } = param;
  const query = `INSERT INTO orders (tableId, no_meja, status, customer_name, customer_contact, total_price,payment_type, create_at, update_at) VALUES (${tableId}, ${noMeja},"${status}","${customerName}","${customerContact}",${total_price},"${payment_type}","${createAt}","${updateAt}")`;
  const result = await db.query(query, [param]);
  return result;
};

const insertDetailOrder = async (param, isBulk = true) => {
  const db = new Mysql(configs.get("/mysqlConfig"));
  let s = "";
  if (isBulk) {
    const data = param.item.map((obj) => ({
      order_id: param.order_id,
      productId: obj.productId,
      qty: obj.qty,
      price: obj.price,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    }));
    const datas = data.map((object) => {
      return Object.values(object);
    });
    datas.forEach((res, index) => {
      const temp = `${res.map((es) => "'" + es + "'")}`;
      s = s + `(${temp})` + (datas.length - 1 === index ? "" : ",");
    });
  } else {
    s = `(${param.order_id}, ${param.productId}, ${param.qty}, ${param.price}, '${param.createdAt}', '${param.updatedAt}')`;
  }
  const query = `INSERT INTO detail_order (order_id, product_id, qty , product_price, createdAt, updatedAt) VALUES ${s}`;
  const result = await db.query(query);
  return result;
};

const updateStockAfterOrder = async (param) => {
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `UPDATE products SET qty = (CASE id ${param.iterateItem} END) WHERE id IN(${param.iterateId});`;
  const result = await db.query(query);
  return result;
};

const deleteOrder = async (param) => {
  const { id } = param;
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `DELETE FROM orders WHERE orders.id = ${id}`;
  const result = await db.query(query);
  return result;
};

const updateOrder = async (param) => {
  const { status, id } = param;
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `UPDATE orders SET status = '${status}' WHERE orders.id = '${id}'`;
  const result = await db.query(query, [param]);
  return result;
};

module.exports = {
  insertOrder,
  updateStockAfterOrder,
  insertDetailOrder,
  deleteOrder,
  updateOrder,
};
