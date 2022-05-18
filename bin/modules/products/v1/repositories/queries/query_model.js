const joi = require('joi');

const listProduct = joi.object({
});

const findingProduct = joi.object({
  data: joi.string().required(),
  categoryId: joi.string()
});

module.exports = {
  listProduct,
  findingProduct
};
