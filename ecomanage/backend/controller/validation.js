// Validation 
const Joi = require("joi");

// Register Validation
const registerValidation = async (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    try {
        await schema.validateAsync(data);
        return { error: null }; // Validation succeeded
    } catch (error) {
        return { error: error.details[0].message }; // Validation failed
    }
}

module.exports = {
    registerValidation
};


// Login Validation
const loginValidation = async (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });

    try {
        await schema.validateAsync(data);
        return { error: null }; 
    } catch (error) {
        return { error: error.details[0].message };
    }
}

