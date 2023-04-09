const { async } = require("validate.js");
const Order = require("./domain");

const listOrder = async (payload) => {
  const order = new Order();
  const postCommand = async (payload) => order.listOrder(payload);
  return postCommand(payload);
};

const listOrderByStatusSuccess = async(payload) => {
  const order = new Order();
  const postCommand = async (payload) => order.listOrderByStatusSuccess(payload);
  return postCommand(payload);
}

module.exports = {
  listOrder,
  listOrderByStatusSuccess
};
