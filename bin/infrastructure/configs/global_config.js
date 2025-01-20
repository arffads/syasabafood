require("dotenv").config();
const confidence = require("confidence");

const config = {
  port: process.env.PORT,
  basicAuthApi: [
    {
      name: process.env.BASIC_AUTH_NAME,
      password: process.env.BASIC_AUTH_PASSWORD,
    },
  ],
  authTable: [
    {
      no_meja: process.env.BASIC_AUTH_TABLE,
      password: process.env.BASIC_AUTH_PASSWORD,
    },
  ],
  publicKey: process.env.PUBLIC_KEY_PATH,
  privateKey: process.env.PRIVATE_KEY_PATH,
  mysqlConfig: {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatement: true,
  },
};

const store = new confidence.Store(config);

exports.get = (key) => store.get(key);
