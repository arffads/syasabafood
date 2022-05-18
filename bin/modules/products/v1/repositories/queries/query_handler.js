const Product = require('./domain');

const listProduct = async (payload) => {
  const product = new Product();
  const postCommand = async payload => product.listProduct(payload);
  return postCommand(payload);
};

const findingProduct = async(payload, res) => {
  const product = new Product();
  const postCommand = async payload => product.findingProduct(payload, res);
  return postCommand(payload);
}

module.exports = {
  listProduct,
  findingProduct
};
