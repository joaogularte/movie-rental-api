const knex = require('../config/db');

class UserModel {
  static list() {
    return knex
      .select('id', 'name', 'email', 'password')
      .from('users');
  }

  static get(userId) {
    return knex
      .select('id', 'name', 'email', 'password')
      .from('users')
      .where('id', userId);
  }

  static post(data) {
    return knex('users')
      .insert(data);
  }

  static put(userId, data) {
    const query = knex.from('users');

    if (data.name) {
      query.update('name', data.name);
    }
    if (data.email) {
      query.update('email', data.email);
    }
    if (data.password) {
      query.update('password', data.password);
    }

    return query.where('id', userId);
  }

  static delete(userId) {
    return knex
      .from('users')
      .where('id', userId)
      .del();
  }

  /* Metodos Extras */
  static getByEmail(userEmail) {
    return knex
      .select('id')
      .from('users')
      .where('email', userEmail);
  }
}

module.exports = UserModel;
