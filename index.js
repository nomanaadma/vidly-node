require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const genres = require('./routes/genres');
const home = require('./routes/home');
const app = express();



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