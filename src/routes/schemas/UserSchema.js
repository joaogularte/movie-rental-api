const Joi = require('Joi');
const Schema = require('./Schema');


class UserSchema extends Schema {
    static get(data) {
        const schema = {
            params: Joi.object({
                id: Joi.string().guuid({version: ['uuidv4']}).trim().required(),
            })
        }
        return this.validate(data, schema)
    }

    static list(data) {
    }

    static post(data) {
        const schema = {
            body: Joi.object({
                name: Joi.string().trim().required(),
                email: Joi.string().email().trim().required(),
                passwrod: Joi.string().trim().required(),
                role: Joi.string().valid(['admin', 'user']).required()
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
                name: Joi.string().trim().required(),
                email: Joi.string().email().trim().required(),
                passwrod: Joi.string().trim().required(),
                role: Joi.string().valid(['admin', 'user']).required()
            })
        }
        return this.validate(data, schema);
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



module.exports = UserSchema;