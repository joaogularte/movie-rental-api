const Joi = require('Joi');

const opts = { abortEarly: false, stripUnknown: true, allowUnknown: true}

class Schema {
    static validate(data, schema){
        return Joi.validate(data, schema, opts);
    }
}

module.exports = Schema;