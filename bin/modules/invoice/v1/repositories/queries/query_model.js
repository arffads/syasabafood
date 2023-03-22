const joi = require("joi");

const getInvoiceByOrderId = joi.object({
  order_id: joi.number().optional(),
});

module.exports = {
  getInvoiceByOrderId,
};
