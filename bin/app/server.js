const restify = require('restify');
const project = require('../../package.json');
const wrapper = require('../helpers/utils/wrapper');
const corsMiddleware = require('restify-cors-middleware');
const mysqlConnectionPooling = require('../infrastructure/database/mysql/connection');
const userHandler = require('../modules/user/v1/handlers/api_handler');
const productHandler = require('../modules/products/v1/handlers/api_handler');
const tableHandler = require('../modules/table/v1/handlers/api_handler');
const orderHandler = require('../modules/order/v1/handlers/api_handler');
const jwtAuth = require('../auth/jwt_auth_helper');
const jwtAuthTable = require('../auth/jwt_auth_table');
const basicAuth = require('../auth/basic_auth_helper');

function AppServer() {
    this.server = restify.createServer({
        name: `${project.name}-server`,
        version: project.version
    });

    this.server.use(restify.plugins.acceptParser(this.server.acceptable));
    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.bodyParser({ requestBodyOnGet: true }));
    this.server.use(restify.plugins.authorizationParser());

    const corsConfig = corsMiddleware({
        preflightMaxAge: 5,
        origins:['*'],

        allowHeaders: ['Authorization'],
        exposeHeaders: ['Authorization']
    });

    this.server.pre(corsConfig.preflight);
    this.server.use(corsConfig.actual);

    this.server.use(basicAuth.init());

    this.server.get('/', (req, res) => {
        wrapper.response(res, 'succes', wrapper.data('Index'), 'This service is running is running properly');
    });

    // USER ROUTE
    this.server.post('/users/v1/auth', basicAuth.isAuthenticated, userHandler.authenticate);
    this.server.post('/users/v1/register', userHandler.register);
    this.server.get('/users/v1', jwtAuth.verifyToken, userHandler.getUser);
    
    // ROUTE products
    this.server.post('/products/v1', jwtAuth.verifyToken, productHandler.addProduct);
    this.server.get('/products/v1', jwtAuth.verifyToken, productHandler.listProduct);
    this.server.put('/products/v1/:id', jwtAuth.verifyToken, productHandler.updateProduct);
    this.server.del('/products/v1/:id', jwtAuth.verifyToken, productHandler.deleteProduct);

    // ROUTE TABLE
    this.server.post('/table/v1/addTable', jwtAuth.verifyToken, tableHandler.addTable);
    this.server.get('/table/v1', jwtAuth.verifyToken, tableHandler.listTable);

    this.server.get('/table/v1/auth', jwtAuthTable.verifyToken, tableHandler.authTable);

    //ROUTE ORDERS
    // this.server.post('order/v1', jwtAuth.verifyToken, orderHandler);
    // this.server.get('order/v1', jwtAuth.verifyToken, orderHandler);
    // this.server.put('order/v1', jwtAuth.verifyToken, orderHandler);

    mysqlConnectionPooling.init();
}; 

module.exports = AppServer;