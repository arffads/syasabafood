const config = require('../infrastructure/configs/global_config');

class Table {
    constructor (no_meja, password) {
        this.no_meja = no_meja;
        this.password = password;
    }

    isValidTable (password) {
        return this.password === password;
    }
}

module.exports.findTable = (no_meja, cb) => {
  const tableDatas = config.get('/authTable');
  const tableData = tableDatas.map((value) => {
        if (value.no_meja === no_meja) {
            return value;
        }
        return '';
    });
    const table = new Table(tableData[0].no_meja, tableData[0].password);
    cb(table)
  }