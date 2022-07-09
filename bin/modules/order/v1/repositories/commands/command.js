const Mysql = require("../../../../../infrastructure/database/mysql/db");
const configs = require("../../../../../infrastructure/configs/global_config");

const insertOrder = async (param) => {
  const db = new Mysql(configs.get("/mysqlConfig"));
  const data = param.map((obj) => {
    return Object.values(obj);
  });
  let s = "";
  data.forEach((res, index) => {
    const temp = `${res.map((es) => "'" + es + "'")}`;
    s = s + `(${temp})` + (data.length - 1 === index ? "" : ",");
  });

  const query = `INSERT INTO orders (id, tableId, no_meja, note, qty, customerName, customerContact,product_id, price, create_at, update_at) VALUES ${s}`;
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
  const [
    {
      productId,
      namaProduct,
      qty,
      categoryProduct,
      customerName,
      customerContact,
    },
  ] = param;
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `UPDATE orders SET productId = '${productId}', namaProduct = '${namaProduct}', `;
  const result = await db.query(query, [param]);
  return result;
};

module.exports = {
  insertOrder,
  updateStockAfterOrder,
  deleteOrder,
  updateOrder,
};
