const wrapper = require('../../../../../helpers/utils/wrapper');
const query = require('../queries/query');


class Invoice {
  async listInvoice () {
    let listInvoice = await query.listInvoice();
    if (listInvoice.err) {
      return wrapper.error('err', listInvoice.message, listInvoice.code);
    }else if (listInvoice.data.length === 0) {
      return wrapper.data([], 'Data Not Found', 404);
    }
    listInvoice = listInvoice.data.map(v => Object.assign({}, v));
    return wrapper.data(listProduct, 'Success', 201);
  }
}

module.exports = Invoice;