const debug = require('debug')('app:startup');
const debug2 = require('debug')('app:database');
const morgan = require('morgan');
const express = require('express');
const app = express();



if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan Enabled');
}

debug2('database connection established');




const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port}`))