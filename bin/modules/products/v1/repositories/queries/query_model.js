const joi = require("joi");

const listProduct = joi.object({});
const listProductByProductId = joi.object({
  productId: joi.number().optional(),
});

const listProductByCategoryId = joi.object({
  categoryId: joi.number().optional(),
});

module.exports = {
  listProduct,
  listProductByProductId,
  listProductByCategoryId,
};
