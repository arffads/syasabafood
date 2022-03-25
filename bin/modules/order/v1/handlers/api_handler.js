const wrapper = require('../../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const queryProduct = require('../../../products/v1/repositories/queries/query');
const validator = require('../utils/validator');
const jwtAuth = require('../../../../auth/jwt_auth_table');


const getTable = async (req, res) => {
  const table = await jwtAuth.getTable(req, res);
  return table;
};

// const getProduct = async(req, res) => {
//   const product = await queryProduct(req, res);
//   return product;
// }

const addOrder = async (req, res) => {
  const tableId = await getTable(req, res);
  const payload = { ...req.body, tableId: tableId.id };
  const validatePayload = validator.isValidPayload(payload, commandModel.insertOrder);
  const postRequest = async (result) => {
    if (result.err) {
      console.log(payload,'213414135');
      return result;
    }
    return await commandHandler.insertOrder(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
    ? wrapper.response(res, 'fail', result.err, result.message)
    : wrapper.response(res, 'succes', result.messaage, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};


module.exports = {
  addOrder
};