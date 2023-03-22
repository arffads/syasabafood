const Invoice = require("./domain");

const getInvoiceByOrderId = async (payload) => {
  const invoice = new Invoice();
  const postCommand = async (payload) => invoice.getInvoiceByOrderId(payload);
  return postCommand(payload);
};

module.exports = {
  getInvoiceByOrderId,
};
