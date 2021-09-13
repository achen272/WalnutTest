const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.username = validText(data.username) ? data.username : '';
    data.password = validText(data.password) ? data.password: '';
    data.password2 = validText(data.password2) ? data.password2 : '';


    if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
        errors.name = "Name must be longer than two characters";
    }

    if (Validator.isEmpty(data.name)){
        errors.name = "Name can't be blank";
    }

    if (!Validator.isLength(data.username, { min: 6, max: 30 })) {
        errors.username = "Username must be between 6 and 30 characters";
    }

    if (Validator.isEmpty(data.username)){
        errors.username = "Username can't be blank";
    }

    if (Validator.isEmpty(data.password)){
        errors.password = "Password can't be blank";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters";
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm Password field is required';
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords must match'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}