const morgan = require('morgan');
require('express-async-errors');

module.exports = function(app) {

    if(app.get('env') !== 'production') {
        app.use(morgan('tiny'));
    }

}

