const config = require('../infrastructure/configs/global_config');

class Table {
    constructor (noMeja, password) {
        this.noMeja = noMeja;
        this.password = password;
    }

    isValidTable (password) {
        return this.password === password;
    }
}

module.exports.findTable = (noMeja, cb) => {
  const tableDatas = config.get('/authTable');
  const tableData = tableDatas.map((value) => {
        if (value.noMeja === noMeja) {
            return value;
        }
        return '';
    });
    const table = new Table(tableData[0].noMeja, tableData[0].password);
    cb(table)
  }