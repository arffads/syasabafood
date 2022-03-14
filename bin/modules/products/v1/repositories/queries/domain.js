const wrapper = require('../../../../../helpers/utils/wrapper');
const query = require('../queries/query');

class Product {
  async listProduct () {
    let listProduct = await query.listProduct();
    if (listProduct.err) {
      return wrapper.error('err', listProduct.message, listProduct.code);
    } else if (listProduct.data.length === 0) {
      return wrapper.data([], 'data Not Found', 404);
    }
    listProduct = listProduct.data.map(v => Object.assign({}, v));
    return wrapper.data(listProduct, 'Succes', 201);
  }
}

module.exports = Product;