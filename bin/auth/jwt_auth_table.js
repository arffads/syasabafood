const jwt = require("jsonwebtoken");
const fs = require("fs");
const config = require("../infrastructure/configs/global_config");
const tableQuery = require("../modules/table/v1/repositories/queries/query");
const wrapper = require("../helpers/utils/wrapper");
const { ERROR } = require("../helpers/http-error/custom_error");

const getKey = (keyPath) => fs.readFileSync(keyPath, "utf8");

const generateToken = async (payload) => {
  const privateKey = getKey(config.get("/privateKey"));
  const verifyOptions = {
    algorithm: "RS256",
    audience: "97b331dh93-4hil3ff-4e83358-9848124-b3aAsd9b9f72c34",
    issuer: "syasaba",
    expiresIn: "7d",
  };
  const token = jwt.sign(payload, privateKey, verifyOptions);
  return token;
};

const getToken = (headers) => {
  if (
    headers &&
    headers.authorization &&
    headers.authorization.includes("Bearer")
  ) {
    const parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyTokenTable = async (req, res, next) => {
  const result = {
    data: null,
  };
  const publicKey = fs.readFileSync(config.get("/publicKey"), "utf8");
  const verifyOptions = {
    algorithm: "RS256",
    audience: "97b331dh93-4hil3ff-4e83358-9848124-b3aAsd9b9f72c34",
    issuer: "syasaba",
  };

  const token = getToken(req.headers);
  if (!token) {
    return wrapper.response(
      res,
      "fail",
      result,
      "Invalid token! Tot",
      ERROR.FORBIDDEN
    );
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, publicKey, verifyOptions);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return wrapper.response(
        res,
        "fail",
        result,
        "Access token expired!",
        ERROR.UNAUTHORIZED
      );
    }
    return wrapper.response(
      res,
      "fail",
      result,
      "Token is not valid!",
      ERROR.UNAUTHORIZED
    );
  }
  const no_meja = decodedToken;
  console.log(no_meja, "DASDA")
  const findTable = await tableQuery.findTable(no_meja);
  if (findTable.err) {
    return wrapper.response(
      res,
      "fail",
      result,
      "Invalid token! Sat",
      ERROR.FORBIDDEN
    );
  } else if (findTable.data.length === 0) {
    return wrapper.response(
      res,
      "fail",
      result,
      "Invalid token! Blog",
      ERROR.FORBIDDEN
    );
  }
  next();
};

const getTable = async (req, res) => {
  const result = {
    data: null,
  };
  const publicKey = fs.readFileSync(config.get("/publicKey"), "utf8");
  const verifyOptions = {
    algorithm: "RS256",
    audience: "97b331dh93-4hil3ff-4e83358-9848124-b3aAsd9b9f72c34",
    issuer: "syasaba",
  };

  const token = getToken(req.headers);
  if (!token) {
    return wrapper.response(
      res,
      "fail",
      result,
      "Invalid token!",
      ERROR.FORBIDDEN
    );
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, publicKey, verifyOptions);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return wrapper.response(
        res,
        "fail",
        result,
        "Access token expired!",
        ERROR.UNAUTHORIZED
      );
    }
    return wrapper.response(
      res,
      "fail",
      result,
      "Token is not valid!",
      ERROR.UNAUTHORIZED
    );
  }
  const no_meja = decodedToken.no_meja;
  const findTable = await tableQuery.findTable({ no_meja });
  const table = await findTable.data.map((v) => Object.assign({}, v))[0];
  return table;
};

module.exports = {
  generateToken,
  verifyTokenTable,
  getTable,
};
