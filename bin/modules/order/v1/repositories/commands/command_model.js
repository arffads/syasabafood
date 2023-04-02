const joi = require("joi");

const insertOrder = joi.object({
  id: joi.string().optional(),
  tableId: joi.number().optional(),
  noMeja: joi.number().optional(),
  status: joi.string().optional(),
  customerName: joi.string().required(),
  customerContact: joi.string().optional(),
  total_price: joi.number().required(),
  item: joi.array().items(
    joi.object().keys({
      productId: joi.number().required(),
      qty: joi.number().required(),
      price: joi.number().required(),
    })
  ),
});

const deleteOrder = joi.object({
  id: joi.number().required(),
});

const updateOrder = joi.object({
  id: joi.string().optional(),
  tableId: joi.number().optional(),
  noMeja: joi.number().optional(),
  status: joi.string().optional(),
  customerName: joi.string().optional(),
  customerContact: joi.string().optional(),
  total_price: joi.number().optional(),
  item: joi.array().items(
    joi.object().keys({
      productId: joi.number().optional(),
      qty: joi.number().optional(),
      price: joi.number().optional(),
    })
  ),
});

module.exports = {
  insertOrder,
  deleteOrder,
  updateOrder,
};
