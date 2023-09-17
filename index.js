require('dotenv').config();
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
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

const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name: 'course 3'},
]

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);

    res.send(course);

});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id) );
    
    if(!course) return res.status(404).send('The course with given id was not found.');

    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
   
    const course = courses.find(c => c.id === parseInt(req.params.id) );
    if(!course) return res.status(404).send('The course with given id was not found.');

    const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);

});


app.delete('/api/courses/:id', (req, res) => {
   
    const course = courses.find(c => c.id === parseInt(req.params.id) );
    if(!course) return res.status(404).send('The course with given id was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});


function validateCourse(course) {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);

}



const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port}`))