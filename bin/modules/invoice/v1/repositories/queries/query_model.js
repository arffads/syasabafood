const joi = require('joi');

const listInvoice = joi.object({
});
const listInvoiceByTable = joi.object({
  tableId: joi.number().required()
});

module.exports = {
  listInvoice,
  listInvoiceByTable
};