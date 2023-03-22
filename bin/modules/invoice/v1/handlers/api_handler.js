const wrapper = require("../../../../helpers/utils/wrapper");
const queryHandler = require("../repositories/queries/query_handler");
const queryModel = require("../repositories/queries/query_model");
const validator = require("../utils/validator");

const getInvoiceByOrderId = async (req, res) => {
  const payload = req.params;
  const validatePayload = validator.isValidPayload(
    payload,
    queryModel.getInvoiceByOrderId
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await queryHandler.getInvoiceByOrderId(result.data);
  };
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result.err, result.message)
      : wrapper.response(res, "succes", result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  getInvoiceByOrderId,
};
