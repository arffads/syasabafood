const Mysql = require('../../../../../infrastructure/database/mysql/db');
const configs = require('../../../../../infrastructure/configs/global_config');


const findUser = async (param) => {
    const db = new Mysql(configs.get('/mysqlConfig'));
    const query = `SELECT * FROM users WHERE name = "${param.name}" LIMIT 1`;
    const result = await db.query(query);
    return result;
};


const getUser = async (param) => {
    const db = new Mysql(configs.get('/mysqlConfig'));
    const query = 'SELECT id, name, role FROM users';
    const result = await db.query(query);
    return result;
}

module.exports = {
    findUser,
    getUser
};