const Invoice = require('./domain');

const listInvoice = async (payload) => {
  const invoice = new Invoice();
  const postCommand = async payload => invoice.listInvoice(payload);;
  return postCommand(payload);
};

const listInvoiceByTable = async (payload) => {
  const invoice = new Invoice();
  const postCommand = async payload => invoice.listInvoiceByTable(payload);;
  return postCommand(payload);
};

module.exports = {
  listInvoice,
  listInvoiceByTable
};