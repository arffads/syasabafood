const wrapper = require("../../../../helpers/utils/wrapper");
const commandHandler = require("../repositories/commands/command_handler");
const commandModel = require("../repositories/commands/command_model");
const queryHandler = require("../repositories/queries/query_handler");
const queryModel = require("../repositories/queries/query_model");
const validator = require("../utils/validator");
const jwtAuthTable = require("../../../../auth/jwt_auth_table");

const getTable = async (req, res) => {
  const table = await jwtAuthTable.getTable(req, res);
  return table;
};

const addOrder = async (req, res) => {
  const tableId = await getTable(req, res);
  const payload = req.body;
  payload.tableId = tableId.id;
  payload.noMeja = tableId.no_meja;

  const validatePayload = validator.isValidPayload(
    payload,
    commandModel.insertOrder
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.insertOrder(result.data);
  };
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result.err, result.message)
      : wrapper.response(res, 'success', result.data, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const listOrder = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(
    payload,
    queryModel.listOrder
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    const ress = await queryHandler.listOrder(result.data);
    return ress;
  };
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result.err, result.message)
      : wrapper.response(res, "succes", result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const deleteOrder = async (req, res) => {
  const payload = req.params;
  const validatePayload = validator.isValidPayload(
    payload,
    commandModel.deleteOrder
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.deleteOrder(payload);
  };
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result.err, result.messaage)
      : wrapper.response(res, "success", result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const updateOrder = async (req, res) => {
  const payload = {
    id: req.params.id, status: req.body.status
  }
  const validatePayload = validator.isValidPayload(
    payload,
    commandModel.updateOrder
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.updateOrder(payload);
  };
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result.err, result.messaage)
      : wrapper.response(res, "success", result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const listOrderByStatusSuccess = async(req, res) => {
  const payload = req.params;
  const validatePayload = validator.isValidPayload(
    payload,
    queryModel.listOrderByStatusSuccess
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await queryHandler.listOrderByStatusSuccess(result.data);
  };
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result.err, result.message)
      : wrapper.response(res, "succes", result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
}

module.exports = {
  addOrder,
  updateOrder,
  deleteOrder,
  listOrder,
  listOrderByStatusSuccess
};
