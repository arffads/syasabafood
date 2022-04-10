const wrapper = require('../../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const queryProduct = require('../../../products/v1/repositories/queries/query');
const validator = require('../utils/validator');
const jwtAuthTable = require('../../../../auth/jwt_auth_table');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const { async, result } = require('validate.js');


const getTable = async (req, res) => {
  const table = await jwtAuthTable.getTable(req, res);
  return table;
};

const getUser = async (req, res) => {
  const user = await jwtAuth.getUser(req, res);
  return user;
};


const addOrder = async (req, res) => {
  const tableId = await getTable(req, res);
  const payload = req.body.map(item => {
    return {
      id:'null',
      tableId: tableId.id, 
      noMeja:tableId.no_meja,
      ...item,
    }
  })
  const validatePayload = validator.isValidPayload(payload, commandModel.insertOrder);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.insertOrder(result.data);
  };
  const sendResponse = async (result) => {
    (result. err)
     ? wrapper.response(res, 'fail', result.err, result.message)
     : wrapper.response(res, 'succes', result.messaage, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const deleteOrder = async (req, res) => {
  const payload = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.deleteOrder);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.deleteOrder(payload);
  };
  const sendResponse = async(result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.messaage)
      : wrapper.response(res, 'success', result, result.message, result.code)
  };
  sendResponse(await postRequest(validatePayload));
};

const updateOrder = async (req, res) => {
  const userId = await getUser(req, res);
  const payload = { 
    ...req.params,
    ...req.body,
    userId: userId.id
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.updateOrder);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.updateOrder(payload);
  };
  const sendResponse = async(result) => {
    (result.err)
    ? wrapper.response(res, 'fail', result.err, result.messaage)
    : wrapper.response(res, 'success', result, result.message, result.code)
  }
  sendResponse(await postRequest(validatePayload));
};


module.exports = {
  addOrder,
  updateOrder,
  deleteOrder
};