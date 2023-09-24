require('dotenv').config();
require('express-async-errors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/home');
const error = require('./middlewares/error');
const logger = require('./helpers/logger');
const app = express();

process.on('uncaughtException', (ex) => {

    console.log('WE GOT AN UNCAUGHT EXCEPTION');
    logger.error(ex.message, ex);

});




throw new Error('Crasheddd !');



if(!process.env.jwtPrivateKey) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://127.0.0.1:27017/vidly')
    .then(() => console.log('connected to mongo db'))
    .catch(() => console.error('could not connect to mongo db'));

if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled');
}

app.use(express.json());
app.use(helmet());


app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);

app.use(error);

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port}`))