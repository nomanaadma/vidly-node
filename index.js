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

const port = config.get('port');
app.listen(port, () => logger.info(`Listening on port ${port}`))