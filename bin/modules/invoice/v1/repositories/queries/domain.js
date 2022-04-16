const wrapper = require('../../../../../helpers/utils/wrapper');
const query = require('../queries/query');
const ejs = require('ejs');
const pdf = require('html-pdf');
const path = require('path');
const moment = require('moment-timezone');

moment.tz('Asia/Jakarta');


class Invoice {
  async listInvoice () {
    let listInvoice = await query.listInvoice();
    if (listInvoice.err) {
      return wrapper.error('err', listInvoice.message, listInvoice.code);
    }else if (listInvoice.data.length === 0) {
      return wrapper.data([], 'Data Not Found', 404);
    }
    listInvoice = listInvoice.data.map(v => Object.assign({}, v));
    return wrapper.data(listInvoice, 'Success', 201);
  }

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
  // for(const [i, value] of  datas.entries()){

  // };
    // nameFile = 'invoice.ejs';
  }
}

module.exports = Invoice;