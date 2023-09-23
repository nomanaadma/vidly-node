const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const asyncMiddleware = require('../middlewares/async');

const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');

router.get('/', asyncMiddleware( async (req, res) => {
    
    const genres = await Genre.find().sort('name');
    res.send( genres );

}));

router.post('/', auth, async (req, res) => {

    const { error } = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({ name: req.body.name });
    await genre.save();

    res.send(genre);

});

router.get('/:id', async (req, res) => {
    
    const genre = await Genre.findById(req.params.id);
    
    if(!genre) return res.status(404).send('The genre with given id was not found.');

    res.send(genre);
});


router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { 
        new: true
    });

    if(!genre) return res.status(404).send('The genre with given id was not found.');

    res.send(genre);

});


router.delete('/:id', [auth, admin], async (req, res) => {
   
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if(!genre) return res.status(404).send('The genre with given id was not found.');

    res.send(genre);

});


module.exports = router;
