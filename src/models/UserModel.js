const knex = require('../config/db');

class UserModel {

   /**
   * Retorna todos os registros com as colunas
   * id, name, email, password da coluna users
   */
  static list() {
    return knex
      .select('id', 'name', 'email', 'password')
      .from('users');
  }

  /**
   * Retorna o registro com as colunas
   * id, name, email e password da tabela
   * users onde userId for igual a coluna id
   */
  static get(userId) {
    return knex
      .select('id', 'name', 'email', 'password')
      .from('users')
      .where('id', userId);
  }

  /**
   * Realiza insert de registros na tabela users
   */
  static post(data) {
    return knex('users')
      .insert(data);
  }

  /**
   * Realiza update do registro da tabela users
   * onde userId for igual a coluna id
   */
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

  /**
   * Realiza delete do registro da tabela users
   * onde userId for igual a coluna id
   */
  static delete(userId) {
    return knex
      .from('users')
      .where('id', userId)
      .del();
  }

  /* Metodos Extras */

  /**
   * Seleciona o id da tabela users onde email
   * for igual a userEmail
   */
  static getByEmail(userEmail) {
    return knex
      .select('id')
      .from('users')
      .where('email', userEmail);
  }
}

module.exports = UserModel;
