const Joi = require('joi');

const regexp = require('../config/regexp.enum');

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(100).required().default(''),
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim(),
        password: Joi.string().regex(regexp.PASSWORD).required(),
        age: Joi.number().integer().min(10).max(120)
    }),
    editableUserValidator: Joi.object({
        name: Joi.string().min(2).max(100).optional(),
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().optional(),
        age: Joi.number().integer().min(10).max(120).optional()
    })
};