const Joi = require('joi');
const Schema = require('./Schema');

class AuthSchema extends Schema {
  static post(data) {
    const schema = {
      body: Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().trim().required(),
      }),
    };
    return this.validate(data, schema);
  }
}

module.exports = AuthSchema;
