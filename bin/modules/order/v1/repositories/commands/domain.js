const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const moment = require('moment-timezone');

moment.tz('Asia/Jakarta');


class Order {
  async insertOrder (payload) {
    payload = moment().format('YYYY-MM-DD HH:mm:ss');
    const insertOrder = await command.insertOrder(payload);
    if (insertOrder.err) {
      return wrapper.error('err', insertOrder.message, insertOrder.code);
    }
    const insertId = { ...insertOrder.data };
    payload.insertId = insertId.insertId;
    return wrapper.data('', 'Succes Input', 201);
  }

  async deleteOrder (payload) {
    const deleteOrder = await command.deleteOrder(payload);
    if (deleteOrder.err) {
      return wrapper.error('err', deleteOrder.message, deleteOrder.code);
    }
    return wrapper.data('', 'Succes Delete', 201);
  }

  async updateOrder (payload) {
    const updateOrder = await command.updateOrder(payload);
    if (updateOrder) {
      return wrapper.error('err', updateOrder.message, updateOrder.code);
    }
    return wrapper.data('', 'Succes Update', 201);
  }
}

module.exports = Order;