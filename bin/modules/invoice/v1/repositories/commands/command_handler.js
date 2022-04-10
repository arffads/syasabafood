const Invoice = require('./domain');

const insertInvoice = async (payload) => {
  const invoice = new Invoice();
  const postCommand = async payload => invoice.insertInvoice(payload);
  return postCommand(payload);
};

const deleteInvoice = async (payload) => {
  const invoice = new Invoice();
  const postCommand = async payload => invoice.deleteInvoice(payload);
  return postCommand(payload)
};

const updateInvoice = async (payload) => {
  const invoice = new Invoice();
  const postCommand = async payload => invoice.updateInvoice(payload);
  return postCommand(payload)
};

module.exports = {
  insertInvoice,
  deleteInvoice,
  updateInvoice
};