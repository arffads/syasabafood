const Mysql = require("../../../../../infrastructure/database/mysql/db");
const configs = require("../../../../../infrastructure/configs/global_config");

const insertOneProduct = async (param) => {
  const {
    namaProduk,
    hargaProduk,
    discount = 0,
    qty,
    type,
    createAt,
    updateAt,
    categoryId,
    userId,
    image,
    // id
  } = param;
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `INSERT INTO products (name, price, discount, qty, type, create_at, update_at, category_id, user_id, image) VALUES ('${namaProduk}', '${hargaProduk}', '${discount}', '${qty}', '${type}','${createAt}', '${updateAt}','${categoryId}', '${userId}', '${image}')`;
  const result = await db.query(query);
  return result;
};

const deleteProduct = async (param) => {
  const { id } = param;
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `DELETE FROM products WHERE products.id = ${id}`;
  const result = await db.query(query, [param]);
  return result;
};

const updateProduct = async (param) => {
  console.log(param, "<======")
  const {
    id,
    namaProduk,
    hargaProduk,
    discount = 0,
    qty,
    type,
    createAt,
    updateAt,
    categoryId,
  } = param;
  const db = new Mysql(configs.get("/mysqlConfig"));
  const query = `UPDATE products SET name = '${namaProduk}', price = '${hargaProduk}', discount = '${discount}', qty = '${qty}',type = '${type}', category_id = '${categoryId}' WHERE products.id = ${id}`;
  const result = await db.query(query, [param]);
  return result;
};

module.exports = {
  insertOneProduct,
  deleteProduct,
  updateProduct,
};
