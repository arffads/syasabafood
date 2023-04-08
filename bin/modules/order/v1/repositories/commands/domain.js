const wrapper = require("../../../../../helpers/utils/wrapper");
const command = require("../commands/command");
const moment = require("moment-timezone");

moment.tz("Asia/Jakarta");

class Order {
  async insertOrder(payload) {
    const payloadOrder = {
      ...payload,
      status: "on_progress",
      createAt: `${moment().format("YYYY-MM-DD HH:mm:ss").toString()}`,
      updateAt: `${moment().format("YYYY-MM-DD HH:mm:ss").toString()}`,
    };

    const insertOrder = await command.insertOrder(payloadOrder);

    const detailOrderPayload = {
      order_id: insertOrder.data.insertId,
      item: payloadOrder.item,
      createdAt: `${moment().format("YYYY-MM-DD HH:mm:ss").toString()}`,
      updatedAt: `${moment().format("YYYY-MM-DD HH:mm:ss").toString()}`,
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
    return wrapper.data({id: insertOrder.data.insertId}, "Succes Input");
  }

  async deleteOrder(payload) {
    const deleteOrder = await command.deleteOrder(payload);
    if (deleteOrder.err) {
      return wrapper.error("err", deleteOrder.message, deleteOrder.code);
    }
    return wrapper.data("", "Succes Delete", 201);
  }

  async updateOrder(payload) {
    payload.createAt =  `${moment().format("YYYY-MM-DD HH:mm:ss").toString()}`;
    const updateOrder = await command.updateOrder(payload);
    if (updateOrder.err) {
      return wrapper.error("err", updateOrder.message, updateOrder.code);
    }
    return wrapper.data("", "Succes Update", 201);
  }
}

module.exports = Order;
