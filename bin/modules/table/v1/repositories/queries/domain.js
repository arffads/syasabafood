const wrapper = require('../../../../../helpers/utils/wrapper');
const query = require('./query');

class Table {
  async listTable () {
    let listTable = await query.listTable();
    if (listTable.err) {
      return wrapper.error('err', listTable.message, listTable.code);
    } else if (listTable.data.length === 0) {
      return wrapper.data([], 'Data Not Found', 404);
    }
    listTable = listTable.data.map(v => Object.assign({}, v));
    return wrapper.data(listTable, 'Succes', 201);
  }
}

module.exports = Table;