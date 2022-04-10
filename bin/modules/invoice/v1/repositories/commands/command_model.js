const joi = require('joi');

const insertInvoice = joi.array().items(joi.object().keys({
  invoiceId:joi.string().optional(),
  invoiceNumber:joi.number().optional(),
  orderId: joi.number().optional()
}));

const deleteInvoice = joi.object({
  token: joi.number().required()
});

const updateInvoice = joi.object({
  customerName: joi.string().required(),
  customerContact: joi.string().optional(),
  product: joi.string().required(),
  qty: joi.number().required(),
  note: joi.string().optional()
});

module.exports = {
  insertInvoice,
  deleteInvoice,
  updateInvoice
};