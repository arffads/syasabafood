const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');

const insertOneUser = async (param) => {
    const { name, password, role } = param;
    const db = new Mysql(configs.get('/mysqlConfig'));
    const query = `INSERT INTO users (id, name, password, role) 
    VALUES (NULL, '${name}', '${password}', '${role}')`;
    const result = await db.query(query, [param]);
    return result;
};

const updateUser = async (param) => {
  const { id, name, password, role } = param;
  const db = new Mysql(configs.get('/mysqlConfig'));
  let query;
  if (password) {
    query = `UPDATE users 
    SET name = '${name}', password = '${password}', role = '${role}'
    WHERE users.id = ${id}`;
  } else {
    query = `UPDATE users 
    SET name = '${name}', role = '${role}'
    WHERE users.id = ${id}`;
  }
  const result = await db.query(query, [param]);
  return result;
};


const deleteUser = async (param) => {
    const { id } = param;
    const db = new Mysql(configs.get('mysqlConfig'));
    const query = `DELETE FROM users WHERE users.id = ${id}`;
    const result = await db.query(query, [param]);
    return result;
};

module.exports = {
    insertOneUser,
    updateUser,
    deleteUser
};