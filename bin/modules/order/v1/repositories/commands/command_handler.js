const Order = require('./domain');

const insertOrder = async (payload) => {
  const order = new Order();
  const postCommand = async payload => order.insertOrder(payload);
  return postCommand(payload);

};

const deleteOrder = async (payload) => {
  const order = new Order();
  const postCommand = async payload => order.deleteOrder(payload);
  return postCommand(payload)
};

const updateOrder = async (payload) => {
  const order = new Order();
  const postCommand = async payload => order.updateOrder(payload);
  return postCommand(payload)
};

module.exports = {
  insertOrder,
  deleteOrder,
  updateOrder
};