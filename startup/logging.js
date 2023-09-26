const morgan = require('morgan');
require('express-async-errors');

module.exports = function(app) {

    if(app.get('env') === 'development') {
        app.use(morgan('tiny'));
    }

}

