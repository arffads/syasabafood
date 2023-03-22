const wrapper = require("../../../../../helpers/utils/wrapper");
const query = require("../queries/query");

class Order {
  async listOrder() {
    let listOrder = await query.listOrder();
    if (listOrder.err) {
      return wrapper.error("err", listOrder.message, listOrder.code);
    } else if (listOrder.data.length === 0) {
      return wrapper.data([], "Data Not Found", 404);
    }
    listOrder = listOrder.data.map((v) => Object.assign({}, v));
    return wrapper.data(listOrder, "Success", 201);
  }
}

module.exports = Order;
