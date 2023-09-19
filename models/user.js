const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('Users', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        trim: true,
    },
}));


function validateUser(user) {

    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });

    return schema.validate(user);

}

exports.User = User;
exports.validate = validateUser;