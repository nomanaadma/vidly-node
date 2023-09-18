require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const genres = require('./routes/genres');
const home = require('./routes/home');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/vidly')
    .then(() => console.log('connected to mongo db'))
    .catch(() => console.error('could not connect to mongo db'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled');
}

app.use(express.json());
app.use(helmet());


app.use('/api/genres', genres);
app.use('/', home);



const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port}`))