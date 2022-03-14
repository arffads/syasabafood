const AppServer = require('./bin/app/server');
const configs = require('./bin/infrastructure/configs/global_config');
// const io = require('socket.io');
const logger = require('./bin/helpers/utils/logger');
const appServer = new AppServer();
const port = process.env.PORT || configs.get('./port') || 4000;

appServer.server.listen(port, () => {
    const ctx = 'app-listen';
    logger.log(ctx, `${appServer.server.name} started, listening at ${appServer.server.url}`, 'initiate application');
});