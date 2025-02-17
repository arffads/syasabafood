const wrapper = require("../../../../../helpers/utils/wrapper");
const command = require("../commands/command");
const query = require("../queries/query")
const moment = require("moment-timezone");

moment.tz("Asia/Jakarta");

class Order {
  async insertOrder(payload) {
    const dateNow = moment();
    const payloadOrder = {
      ...payload,
      status: "waiting_for_paid",
      createAt: `${dateNow.format("YYYY-MM-DD HH:mm:ss")}`,
      updateAt: `${dateNow.format("YYYY-MM-DD HH:mm:ss")}`,
    };

    const insertOrder = await command.insertOrder(payloadOrder);

    const detailOrderPayload = {
      order_id: insertOrder.data.insertId,
      item: payloadOrder.item,
      createdAt: `${dateNow.format("YYYY-MM-DD HH:mm:ss")}`,
      updatedAt: `${dateNow.format("YYYY-MM-DD HH:mm:ss")}`,
    };

    let checkingDataProducts = detailOrderPayload.item.map((items) => {
      return items.productId;
    });

    let isDuplicate = checkingDataProducts.some((item, index) => {
      return checkingDataProducts.indexOf(item) != index;
    });
    if (isDuplicate === true) {
      throw new Error("Product Duplicate");
    }
    const insertDetailOrder = await command.insertDetailOrder(
      detailOrderPayload
    );

    let t = [];
    let b = [];

    detailOrderPayload.item.map((el, i) => {
      t.push(el.productId);
      b.push(`WHEN ${el.productId} THEN qty - ${el.qty}`);
    });
    const iterateItem = b.join(" ");
    const iterateId = t.join();

    const updateStockAfterOrder = await command.updateStockAfterOrder({
      iterateItem,
      iterateId,
    });
    if (insertOrder.err) {
      return wrapper.error("err", insertOrder.message, insertOrder.code);
    }
    if (insertDetailOrder.err || updateStockAfterOrder.err) {
      return wrapper.error(
        "err",
        insertDetailOrder.message,
        insertDetailOrder.code
      );
    }
    const getOrderById = await query.getOrderByOrderId(insertOrder.data.insertId)

    console.log(getOrderById.data,"?????????????")
    return wrapper.data({ id: insertOrder.data.insertId,...getOrderById.data[0] }, "Succes Input");
  }

  async insertDetailOrders(payload) {
    const dateNow = moment();

    const detailOrderPayload = {
      order_id: payload.order_id,
      productId: payload.productId,
      qty: payload.qty,
      price: payload.price,
      createdAt: `${dateNow.format("YYYY-MM-DD HH:mm:ss")}`,
      updatedAt: `${dateNow.format("YYYY-MM-DD HH:mm:ss")}`,
    };
    const insertDetailOrder = await command.insertDetailOrder(
      detailOrderPayload,
      false
    );

    if (insertDetailOrder.err) {
      return wrapper.error(
        "err",
        insertDetailOrder.message,
        insertDetailOrder.code
      );
    }
    return wrapper.data(
      { id: insertDetailOrder.data.insertId },
      "Succes Input"
    );
  }

  async deleteOrder(payload) {
    const deleteOrder = await command.deleteOrder(payload);
    if (deleteOrder.err) {
      return wrapper.error("err", deleteOrder.message, deleteOrder.code);
    }
    return wrapper.data("", "Succes Delete", 201);
  }

  async updateOrder(payload) {
    payload.createAt = `${moment().format("YYYY-MM-DD HH:mm:ss").toString()}`;
    const updateOrder = await command.updateOrder(payload);
    if (updateOrder.err) {
      return wrapper.error("err", updateOrder.message, updateOrder.code);
    }
    return wrapper.data("", "Succes Update", 201);
  }
}

module.exports = Order;
