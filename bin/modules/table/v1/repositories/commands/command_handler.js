const Table = require('./domain');

const authTable = async (payload) => {
  const table = new Table();
  const postCommand = async payload => table.authTable(payload);
  return postCommand(payload);
};

const addTable = async (payload) => {
  const table = new Table();
  const postComand = async payload => table.addTable(payload);
  return postComand(payload);
};

const deleteTable = async (payload) => {
  const table = new Table();
  const postComand = async payload => table.deleteTable(payload);
  return postComand(payload);
};

module.exports = {
  authTable,
  addTable,
  deleteTable
};