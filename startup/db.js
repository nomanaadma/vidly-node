const mongoose = require('mongoose');
const logger = require('../helpers/logger');
const config = require('config');

module.exports = function() {

    const db = config.get('connection');

    mongoose.connect(db)
        .then(() => logger.info(`Connected to mongo db ${db}`));

}