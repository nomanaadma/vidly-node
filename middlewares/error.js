const logger = require('../helpers/logger');

module.exports = function(err, req, res, next) {
    
    logger.error(err.message, err);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    // log the exception
    res.status(500).send('Something Went Wrong');



}



