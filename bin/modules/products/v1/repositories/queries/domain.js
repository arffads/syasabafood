const wrapper = require("../../../../../helpers/utils/wrapper");
const query = require("../queries/query");

class Product {
  async listProduct() {
    let listProduct = await query.listProduct();
    if (listProduct.err) {
      return wrapper.error("err", listProduct.message, listProduct.code);
    } else if (listProduct.data.length === 0) {
      return wrapper.data([], "data Not Found", 404);
    }
    listProduct = listProduct.data.map((v) => Object.assign({}, v));
    return wrapper.data(listProduct, "Succes", 201);
  }

  async listProductByProductId(payload) {
    let { productId } = payload;
    let findProductByProductId = await query.findProductByProductId({
      productId,
    });
    if (findProductByProductId.err) {
      return wrapper.error(
        "err",
        findProductByProductId.message,
        findProductByProductId.code
      );
    } else if (findProductByProductId.data.length === 0) {
      return wrapper.data([], "data Not Found", 404);
    }
    findProductByProductId = findProductByProductId.data.map((v) =>
      Object.assign({}, v)
    );
    return wrapper.data(findProductByProductId, "Succes", 201);
  }

  async listProductByCategoryId(payload) {
    let { categoryId } = payload;
    let findProductByCategoryId = await query.findProductByCategoryId({
      categoryId,
    });
    if (findProductByCategoryId.err) {
      return wrapper.error(
        "err",
        findProductByCategoryId.message,
        findProductByCategoryId.code
      );
    } else if (findProductByCategoryId.data.length === 0) {
      return wrapper.data([], "data Not Found", 404);
    }
    findProductByCategoryId = findProductByCategoryId.data.map((v) =>
      Object.assign({}, v)
    );
    return wrapper.data(findProductByCategoryId, "Succes", 201);
  }
}

module.exports = Product;
