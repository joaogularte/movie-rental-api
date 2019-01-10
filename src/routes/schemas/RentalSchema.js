const Joi = require('joi');
const Schema = require('./Schema');

class RentalSchema extends Schema {
  static get(data) {
    const schema = {
      params: Joi.object({
        id: Joi.string().guid({ version: ['uuidv4'] }).trim().required(),
      }),
    };
    return this.validate(data, schema);
  }

  static post(data) {
    const schema = {
      body: Joi.object({
        titleMovie: Joi.string().trim().required(),
        idUser: Joi.string().guid({ version: ['uuidv4'] }).trim().required(),
        status: Joi.string().valid(['rented']).required(),
      }),
    };
    return this.validate(data, schema);
  }

  static put(data) {
    const schema = {
      params: Joi.object({
        id: Joi.string().guid({ version: ['uuidv4'] }).required(),
      }),
      body: Joi.object({
        status: Joi.string().valid(['returned']).required(),
      }),
    };
    return this.validate(data, schema);
  }

  static delete(data) {
    const schema = {
      params: Joi.object({
        id: Joi.string().guid({ version: ['uuidv4'] }).trim().required(),
      }),
    };
    return this.validate(data, schema);
  }
}

module.exports = RentalSchema;
