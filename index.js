require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('./helpers/logger');
const config = require('config');

require('./startup/config')();
require('./startup/validation')();
require('./startup/logging')(app);
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/prod')(app);


function startServer(port) {
    return app.listen(port, () => logger.info(`Listening on port ${port}`));
}

if (app.get('env') !== 'test') {
    startServer(config.get('port'));
}

module.exports = startServer;