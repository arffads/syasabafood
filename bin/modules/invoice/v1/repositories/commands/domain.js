const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const moment = require('moment-timezone');

moment.tz('Asia/Jakarta');


class Invoice {
  async insertInvoice (payload) {
    payload = payload.map(item => {
      return {
        ...item, createAt : `${moment().format('YYYY-MM-DD HH:mm:ss').toString()}`,
        updateAt : `${moment().format('YYYY-MM-DD HH:mm:ss').toString()}`
      }
    })
    const insertInvoice = await command.insertInvoice(payload);
    if (insertInvoice.err) {
      return wrapper.error('err', insertInvoice.message, insertInvoice.code);
    }
    return wrapper.data('', 'Succes Input', 201);
  }

  async deleteInvoice (payload) {
    const deleteInvoice = await command.deleteInvoice(payload);
    if (deleteInvoice.err) {
      return wrapper.error('err', deleteInvoice.message, deleteInvoice.code);
    }
    return wrapper.data('', 'Succes Delete', 201);
  }

  async updateInvoice (payload) {
    const updateInvoice = await command.updateInvoice(payload);
    if (updateInvoice.err) {
      return wrapper.error('err', updateInvoice.message, updateInvoice.code);
    }
    return wrapper.data('', 'Succes Update', 201);
  }
}

module.exports = Invoice;