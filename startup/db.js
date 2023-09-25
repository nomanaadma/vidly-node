const mongoose = require('mongoose');
const logger = require('../helpers/logger');
const config = require('config');

module.exports = function() {

    mongoose.connect(config.get('connection'))
        .then(() => logger.info('connected to mongo db'));

}