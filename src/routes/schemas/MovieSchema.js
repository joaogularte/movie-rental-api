const Joi = require('Joi');
const Schema = require('./Schema');

class MovieSchema extends Schema {
    static get(data) {
        const schema = {
            params: Joi.object({
                id: Joi.string().guuid({version: ['uuidv4']}).trim().required(),
            })
        }
        return this.validate(data, schema)
    }

    static list(data){
    }

    static post(data) {
        const schema = {
            body: Joi.object({
                title: Joi.string().trim().required(),
                director: Joi.string().trim().required(),
                quantites: Joi.number().integer().positive().required(),
            })
        }
        return this.validate(data, schema)
    }

    static put(data) {
        const schema = {
            params: Joi.object({
                id: Joi.string().guuid({version: ['uuidv4']}).required(),
            }),
            body: Joi.object({
                director: Joi.string().trim().required(),
                quantites: Joi.number().integer().positive().required(),
            })
        }
        return this.validate(data, schema)
    }

    static delete(data) {
        const schema = {
            params: Joi.object({
                id: Joi.string().guuid({version: ['uuidv4']}).trim().required()
            })
        }
        return this.validate(data, schema);
    }

}