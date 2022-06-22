const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const invoiceCommand = require('../../../../invoice/v1/repositories/commands/command');
const moment = require('moment-timezone');

moment.tz('Asia/Jakarta');


class Order {
  async insertOrder (payload) {
    payload = payload.map(item => {
      return {
        ...item, 
        createAt : `${moment().format('YYYY-MM-DD HH:mm:ss').toString()}`,
        updateAt : `${moment().format('YYYY-MM-DD HH:mm:ss').toString()}`
      }
    
    })
    const insertOrder = await command.insertOrder(payload);
    
    const totalPrice = payload.reduce((acc, curr) => {
      const calcProd = curr.price * curr.qty; 
      return acc + calcProd
    }, 0)
    const invoicePayload = {
      orderId: insertOrder.data.insertId,
      tableId: payload[0].tableId,
      totalPrice: totalPrice,
      createAt : `${moment().format('YYYY-MM-DD HH:mm:ss').toString()}`,
      updateAt : `${moment().format('YYYY-MM-DD HH:mm:ss').toString()}`
    }
    const insertInvoice = await invoiceCommand.insertInvoice(invoicePayload);
    if (insertOrder.err) {
      return wrapper.error(
        'err', insertOrder.message, insertOrder.code 
        );
    }
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
    payload.updateAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const updateOrder = await command.updateOrder(payload);
    if (updateOrder.err) {
      return wrapper.error('err', updateOrder.message, updateOrder.code);
    }
    return wrapper.data('', 'Succes Update', 201);
  }
}

module.exports = Order;