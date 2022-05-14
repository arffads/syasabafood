const wrapper = require('../../../../../helpers/utils/wrapper');
const query = require('../queries/query');
const path = require('path');
const moment = require('moment-timezone');

moment.tz('Asia/Jakarta');


class Invoice {
  async listInvoiceByTable (params) {
    const payload = {
      ...params
    }
    if(params){
      let listInvoiceByTable = await query.listInvoiceByTable(payload);
      if (listInvoiceByTable.err) {
        return wrapper.error('err', listInvoiceByTable.message, listInvoiceByTable.code);
      }else if (listInvoiceByTable.data.length === 0) {
        return wrapper.data([], 'Data Not Found', 404);
      }
      listInvoiceByTable = listInvoiceByTable.data.map(v => Object.assign({}, v));
      return wrapper.data(listInvoiceByTable, 'Success', 201);
    }
  }
}

module.exports = Invoice;