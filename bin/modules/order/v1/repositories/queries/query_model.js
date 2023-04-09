const joi = require("joi");

const listOrder = joi.object({});

const listOrderByStatusSuccess = joi.object({
  order_id: joi.number().optional(),
});

module.exports = {
  listOrder,
  listOrderByStatusSuccess
};
