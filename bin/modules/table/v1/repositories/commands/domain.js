const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const query = require('../queries/query');
const jwtAuth = require('../../../../../auth/jwt_auth_table');
const expiredToken = require('../../utils/constant');
const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const QRCode = require('qrcode');
const moment = require('moment-timezone');
const { table } = require('console');
moment.tz('Asia/Jakarta');


class Table {
  async authTable (payload) {
        let findTable = await query.findTable(payload);
        if (findTable.err) {
            return wrapper.error('err', findTable.message, findTable.code);
        } else if (findTable.data.length === 0) {
            return wrapper.data('', 'Table Not Found', 404);
        }
        findTable = findTable.data.map(v => Object.assign({}, v));

        const validPassword = await bcrypt.compare(payload.password, findTable[0].password);
        if (validPassword) {
            const dataResponse = {
                no_meja: findTable[0].no_meja,
                tableId: findTable[0].id
            };
            const accesToken = await jwtAuth.generateToken(dataResponse, expiredToken.accesToken);
            dataResponse.accesToken = accesToken;
            return wrapper.data(dataResponse, 'Valid Password', 200);
        }
        return wrapper.data('', 'Invalid Password', 400);
    }

  async addTable (payload) {
    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);
    try {
             const insertOneTable = await command.insertOneTable(payload);
              if (insertOneTable.err) {
                return wrapper.error('err', insertOneTable.message, insertOneTable.code);
              } else {
                console.log(insertOneTable,'qwewrqrqsadadasd');
                const qrCodeText = `http://localhost:8080/${payload.noMeja}`;
                const src = `./bin/public/images/${payload.noMeja}.png`;
                const stream = fs.createWriteStream(src);
                await QRCode.toFileStream(stream, qrCodeText);
              }
                return wrapper.data('', 'Succes Input', 201);
          } 
          catch(error) {
            console.log(error,'====');
          }
  }

  async deleteTable (payload) {
    const deleteTable = await command.deleteTable(payload);
    if (deleteTable.err) {
      return wrapper.error('err', deleteTable.message, deleteTable.code);
    }
    return wrapper.data('', 'Succes Delete', 201);
  }
}

module.exports = Table;