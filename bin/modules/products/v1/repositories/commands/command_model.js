const joi = require('joi');

const addProduct = joi.object({
  namaProduk: joi.string().required(),
  hargaProduk: joi.number().required(),
  image: joi.any().required(),
  disount: joi.number().optional(),
  isActive: joi.number().required(),
  categoryId: joi.number().required(),
  userId: joi.number().required(),
  type: joi.string().required()
});

const deleteProduct = joi.object({
  id: joi.number().required()
});

const updateProduct = joi.object({
  id: joi.number().required(),
  namaProduk: joi.string().required(),
  hargaProduk: joi.number().required(),
  disount: joi.number().optional(),
  isActive: joi.number().required(),
  categoryId: joi.number().required(),
  userId: joi.number().required(),
  type: joi.string().required()
});

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct
};