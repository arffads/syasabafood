const wrapper = require('../../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../utils/validator');
const jwtAuth = require('../../../../auth/jwt_auth_helper');



const getUser = async (req, res) => {
  const user = await jwtAuth.getUser(req, res);
  return user;
};

const addProduct = async (req, res) => {
  const userId = await getUser(req, res);
  const payload = { ...req.body, userId: userId.id };
  const validatePayload = validator.isValidPayload(payload, commandModel.addProduct);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.addProduct(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
    ? wrapper.response(res, 'fail', result.err, result.message)
    : wrapper.response(res, 'succes', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const listProduct = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, queryModel.listProduct);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await queryHandler.listProduct(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
    ? wrapper.response(res, 'fail', result.err, result.message)
    : wrapper.response(res, 'succes', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const deleteProduct = async (req, res) => {
  const payload = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.deleteProduct);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.deleteProduct(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const updateProduct = async (req, res) => {
  const userId = await getUser(req, res);
  const payload = {
    ...req.params,
    ...req.body,
    userId: userId.id
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.updateProduct);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.updateProduct(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
  console.log(payload);
};

module.exports = {
  addProduct,
  listProduct,
  deleteProduct,
  updateProduct
};