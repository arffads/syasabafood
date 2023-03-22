const Product = require("./domain");

const listProduct = async (payload) => {
  const product = new Product();
  const postCommand = async (payload) => product.listProduct(payload);
  return postCommand(payload);
};

const listProductByProductyId = async (payload) => {
  const product = new Product();
  const postCommand = async (payload) =>
    product.listProductByProductId(payload);
  return postCommand(payload);
};

const listProductByCategoryId = async (payload) => {
  const product = new Product();
  const postCommand = async (payload) =>
    product.listProductByCategoryId(payload);
  return postCommand(payload);
};

module.exports = {
  listProduct,
  listProductByProductyId,
  listProductByCategoryId,
};
