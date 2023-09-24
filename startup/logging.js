const morgan = require('morgan');
require('express-async-errors');

module.exports = function(app) {

    if(process.env.NODE_ENV !== 'production') {
        app.use(morgan('tiny'));
        console.log('Morgan Enabled');
    }

}

