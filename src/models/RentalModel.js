const knex = require('../config/db');
const rentalStatus = require('./status/rental.json');

class RentalModel {
  /* Metodos Padrões */

  /**
   * Retorna todos os registros com as colunas
   * rentals.id, titleMovie, users.name, users.email, status
   * da tabela rentals relacionando com users onde rentals.idUser é igual users.id'
   */
  static list() {
    return knex
      .select('rentals.id', 'titleMovie', 'users.name', 'users.email', 'status')
      .from('rentals')
      .innerJoin('users', 'rentals.idUser', 'users.id');
  }

  /**
   * Retorna todos os registros com as colunas
   * rentals.id, titleMovie, users.name, users.email, status
   * da tabela rentals relacionando com users onde rentals.idUser é igual users.id
   * e onde rentals.id é igual a rentalId'
   */
  static get(rentalId) {
    return knex
      .select('rentals.id', 'titleMovie', 'users.name', 'users.email', 'status')
      .from('rentals')
      .innerJoin('users', 'rentals.idUser', 'users.id')
      .where('rentals.id', rentalId);
  }

  /**
   * Realiza insert de registros na tabela rentals
   */
  static post(data) {
    return knex.from('rentals').insert(data);
  }

  /**
   * Realiza update do registro da tabela rentals
   * onde rentalId for igual a coluna id
   */
  static put(rentalId, data) {
    const query = knex.from('rentals');

    if (data.status) {
      query.update('status', rentalStatus.returned);
    }

    return query.where('id', rentalId);
  }

  /**
   * Realiza delete do registro da tabela rentals
   * onde rentalId for igual a coluna id
   */
  static delete(rentalId) {
    return knex
      .from('rentals')
      .where('id', rentalId)
      .del();
  }
}

module.exports = RentalModel;
