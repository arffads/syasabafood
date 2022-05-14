const wrapper = require('../../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../utils/validator');
const jwtAuth = require('../../../../auth/jwt_auth_table');

const listInvoice = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, queryModel.listInvoice);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await queryHandler.listInvoiceByTable(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
    ? wrapper.response(res, 'fail', result.err, result.message)
    : wrapper.response(res, 'succes', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
}

const listInvoiceByTable = async (req, res) => {
  const payload = {
    ...req.params
  };
  const validatePayload = validator.isValidPayload(payload, queryModel.listInvoiceByTable);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await queryHandler.listInvoiceByTable(result.data, res);
  };
  const sendResponse = async (result) => {
    if(result.err){
    return wrapper.response(res, 'fail', result.err, result.message)
    } else {
      return wrapper.response(res, 'succes', result, result.message, result.code)
    }
  };
  sendResponse(await postRequest(validatePayload));
}


module.exports = {
  listInvoice,
  listInvoiceByTable
};