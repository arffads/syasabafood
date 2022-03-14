const joi = require('joi');

const authenticate = joi.object({
    name: joi.string().required(),
    password: joi.string().required()
});

const userRegister = joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
    role: joi.number().required()
});

const updateUser = joi.object({
  id: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().optional(),
  role: joi.string().required()
});

const deleteUser = joi.object({
    id: joi.string().required()
});

module.exports = {
    authenticate,
    userRegister,
    updateUser,
    deleteUser
};