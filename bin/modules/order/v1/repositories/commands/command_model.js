const joi = require('joi');

const insertOrder = joi.object({
  tableId: joi.number().required(),
  no_meja: joi.number().required(),
  namaProduct: joi.string().required(),
  categoryProduct: joi.number().required(),
  qty: joi.number().required(),
  customerName: joi.string().required(),
  customerContact: joi.string().optional(),
  productId: joi.number().required()

});

// insertOrder = joi.array().ordered(insertOrder);

const deleteOrder = joi.object({
  token: joi.number().required()
});

const updateOrder = joi.object({
  customerName: joi.string().required(),
  customerContact: joi.string().optional(),
  product: joi.string().required(),
  qty: joi.number().required(),
  note: joi.string().optional()
});

module.exports = {
  insertOrder,
  deleteOrder,
  updateOrder
};