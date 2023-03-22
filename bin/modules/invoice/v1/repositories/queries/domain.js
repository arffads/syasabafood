const wrapper = require("../../../../../helpers/utils/wrapper");
const query = require("../../../../order/v1/repositories/queries/query");
const moment = require("moment-timezone");

moment.tz("Asia/Jakarta");

class Invoice {
  async getInvoiceByOrderId(payload) {
    let { order_id } = payload;
    let getInvoice = await query.findOrderByOrderId({ order_id });
    if (getInvoice.err) {
      return wrapper.error("err", getInvoice.message, getInvoice.code);
    } else if (getInvoice.data.length === 0) {
      return wrapper.data([], "Data Not Found", 404);
    }
    getInvoice = getInvoice.data.map((v) => Object.assign({}, v));
    return wrapper.data(getInvoice, "Success", 201);
  }
}

module.exports = Invoice;
