require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('./helpers/logger');

require('./startup/validation')();
require('./startup/config')();
require('./startup/logging')(app);
require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT || 3100;
app.listen(port, () => logger.info(`Listening on port ${port}`))