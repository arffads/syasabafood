const joi = require('joi');

const insertOrder = joi.array().items(joi.object().keys({
  id:joi.string().optional(),
  tableId: joi.number().optional(),
  noMeja: joi.number().optional(),
  qty: joi.number().required(),
  note: joi.string().optional(),
  customerName: joi.string().required(),
  customerContact: joi.string().optional(),
  productId: joi.number().required()
}));

const deleteOrder = joi.object({
  id: joi.number().required()
});

const updateOrder = joi.array().items(joi.object().keys({
  id:joi.string().optional(),
  tableId: joi.number().optional(),
  noMeja: joi.number().optional(),
  qty: joi.number().required(),
  note: joi.string().optional(),
  customerName: joi.string().required(),
  customerContact: joi.string().optional(),
  productId: joi.number().required()
}));

module.exports = {
  insertOrder,
  deleteOrder,
  updateOrder
};