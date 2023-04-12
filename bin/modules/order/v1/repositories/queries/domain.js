const wrapper = require("../../../../../helpers/utils/wrapper");
const query = require("../queries/query");

class Order {
  async listOrder() {
    let listOrder = await query.listOrder();
    console.log(listOrder, "LIST ORDER")
    if (listOrder.err) {
      return wrapper.error("err", listOrder.message, listOrder.code);
    } else if (listOrder.data.length === 0) {
      return wrapper.data([], "Data Not Found", 404);
    }
    listOrder = listOrder.data.map((v) => Object.assign({}, v));
    
    return wrapper.data(listOrder, "Success", 201);
  }

  async listOrderByStatusSuccess(payload) {
    let { order_id } = payload;
    let getInvoice = await query.listOrderByStatusSuccess({ order_id });
    if (getInvoice.err) {
      return wrapper.error("err", getInvoice.message, getInvoice.code);
    } else if (getInvoice.data.length === 0) {
      return wrapper.data([], "Data Not Found", 404);
    }
    getInvoice = getInvoice.data.map((v) => Object.assign({}, v));
    return wrapper.data(getInvoice, "Success", 201);
  
  }
}

module.exports = Order;
