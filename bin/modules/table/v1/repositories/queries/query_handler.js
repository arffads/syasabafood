const Table = require('./domain');


const listTable = async (payload) => {
  const table = new Table();
  const postCommand = async payload => table.listTable(payload);
  return postCommand(payload);
}


module.exports = {
  listTable
};