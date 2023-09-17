require('dotenv').config();
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');

const logger = require('./middlewares/logger');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');


console.log( config.get('name') );

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(helmet());


app.use('/api/courses', courses);
app.use('/', home);




const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port}`))