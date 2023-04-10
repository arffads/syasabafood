const joi = require('joi');

const authTable = joi.object({
    no_meja: joi.number().required(),
    password: joi.string().required()
});

const addTable = joi.object({
  noMeja: joi.number().required(),
  userId: joi.number().optional(),
  password: joi.string().required()
});

const deleteTable = joi.object({
  id: joi.number().required()
});

module.exports = {
  addTable,
  deleteTable,
  authTable
};