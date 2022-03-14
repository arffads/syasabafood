const joi = require('joi');

const authTable = joi.object({
    noMeja: joi.number().required(),
    password: joi.string().required()
});

const addTable = joi.object({
  noMeja: joi.number().required(),
  userId: joi.number().required()
});

const deleteTable = joi.object({
  id: joi.number().required()
});

module.exports = {
  addTable,
  deleteTable,
  authTable
};