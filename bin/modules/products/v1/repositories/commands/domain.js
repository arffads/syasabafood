const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const query = require('../queries/query');
const moment = require('moment-timezone');

moment.tz('Asia/Jakarta');

class Product {
  async addProduct (payload) {
    payload.createAt = moment().format('YYYY-MM-DD HH:mm:ss');
    payload.updateAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const insertOneProduct = await command.insertOneProduct(payload);
    if (insertOneProduct.err) {
      return wrapper.error('err', insertOneProduct.message, insertOneProduct.code);
    }
    return wrapper.data('', 'Succes Input', 201);
  }

  async findProductById (payload) {
    const findProductById = await query.findProductById(payload);
    if (findProductById.err) {
      return wrapper.error('err', findProductById.message, findProductById.code);
    }
    return wrapper.data('', 'Succes', 201);
  }
  
  async deleteProduct (payload) {
    const deleteProduct = await command.deleteProduct(payload);
    if (deleteProduct.err) {
      return wrapper.error('err', deleteProduct.message, deleteProduct.code);
    }
    return wrapper.data('', 'Success Delete', 201);
  }

  async updateProduct (payload) {
    payload.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const updateProduct = await command.updateProduct(payload);
    if (updateProduct.err) {
      return wrapper.error('err', updateProduct.message, updateProduct.code);
    }
    return wrapper.data('', 'Success Update', 201);

  }
}

module.exports = Product;