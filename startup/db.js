const mongoose = require('mongoose');
const logger = require('../helpers/logger');

module.exports = function() {

    mongoose.connect(process.env.connection)
        .then(() => logger.info('connected to mongo db'));

}