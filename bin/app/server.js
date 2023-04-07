const restify = require("restify");
const project = require("../../package.json");
const wrapper = require("../helpers/utils/wrapper");
const corsMiddleware = require("restify-cors-middleware");
const mysqlConnectionPooling = require("../infrastructure/database/mysql/connection");
const userHandler = require("../modules/user/v1/handlers/api_handler");
const productHandler = require("../modules/products/v1/handlers/api_handler");
const tableHandler = require("../modules/table/v1/handlers/api_handler");
const orderHandler = require("../modules/order/v1/handlers/api_handler");
const invoiceHandler = require("../modules/invoice/v1/handlers/api_handler");
const {verifyToken} = require("../auth/jwt_auth_helper");
const {verifyTokenTable} = require("../auth/jwt_auth_table");
const basicAuth = require("../auth/basic_auth_helper");
const { ERROR } = require("../helpers/http-status/status_code");


function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version,
  });

  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser({ requestBodyOnGet: true }));
  this.server.use(restify.plugins.authorizationParser());

  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ["*"],

    allowHeaders: ["Authorization"],
    exposeHeaders: ["Authorization"],
  });

  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);
  this.server.use(basicAuth.init());
  this.server.get("/", (req, res) => {
    wrapper.response(
      res,
      "succes",
      wrapper.data("Index"),
      "This service is running is running properly"
    );
  });

  this.server.get(
    "/public/*", // don't forget the `/*`
    restify.plugins.serveStaticFiles("./bin/public/product")
  ); // GET /public/index.html -> ./doc/v1/index.html file


  // ADMIN ACTIONS
  this.server.post(
    "/users/v1/auth",
    basicAuth.isAuthenticated,
    userHandler.authenticate
  );
  this.server.post("/users/v1/register", userHandler.register);
  this.server.get("/users/v1", verifyToken, userHandler.getUser);
  this.server.del("/users/v1/:id", verifyToken, userHandler.deleteUser);

  // PRODUCTS ROUTE
  this.server.post("/products/v1", verifyToken, productHandler.addProduct);
  this.server.get("/admin/products/v1", verifyToken, productHandler.listProduct);


  this.server.put(
    "/products/v1/:id",
    verifyToken,
    productHandler.updateProduct
  );
  this.server.del(
    "/products/v1/:id",
    verifyToken,
    productHandler.deleteProduct
  );

  this.server.get(
    "/admin/products/v1/:productId",
    verifyToken,
    productHandler.listProductByProductId
  );

  this.server.get(
    "/products/:categoryId",
    verifyToken,
    productHandler.listProductByCategoryId
  );

  // ROUTE TABLE ADMIN
  this.server.post("/table/v1/add", verifyToken, tableHandler.addTable);
  this.server.get("/table/v1", verifyToken, tableHandler.listTable);
  this.server.del("/table/v1/:id", verifyToken, tableHandler.deleteTable);

  // ROUTE TABLE USER


  //ROUTE ORDER
  this.server.post("/order/v1/add", verifyTokenTable, orderHandler.addOrder);
  this.server.get("/order/v1/list", verifyToken, orderHandler.listOrder);
  this.server.del("/order/v1/:id", verifyToken, orderHandler.deleteOrder);
  this.server.put("/order/v1/:id", verifyToken, orderHandler.updateOrder);
  //  INVOICE ROUTES
  this.server.get(
    "/invoice/:order_id",
    verifyToken,
    invoiceHandler.getInvoiceByOrderId
  );


  // CUSTOMER ACTION

  this.server.post(
    "/table/v1/auth",
    basicAuth.isAuthenticated,
    tableHandler.authTable
  );
  
  this.server.get(
    "/tables/products/v1",
    verifyTokenTable,
    productHandler.listProduct
  );

  this.server.get(
    "/tables/products/v1/:productId",
    verifyTokenTable,
    productHandler.listProductByProductId
  );

  this.server.get(
    "/invoice/:order_id",
    verifyTokenTable,
    invoiceHandler.getInvoiceByOrderId
  );


  mysqlConnectionPooling.init();
}

module.exports = AppServer;
