const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const moment = require('moment-timezone');

moment.tz('Asia/Jakarta');


class Invoice {
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