const knex = require('../config/db');
const rentalStatus = require('./status/rental.json');

class RentalModel {
  static list() {
    return knex
      .select('rentals.id', 'titleMovie', 'users.name', 'users.email', 'status')
      .from('rentals')
      .innerJoin('users', 'rentals.idUser', 'users.id');
  }

  static get(rentalId) {
    return knex
      .select('rentals.id', 'titleMovie', 'users.name', 'users.email', 'status')
      .from('rentals')
      .innerJoin('users', 'rentals.idUser', 'users.id')
      .where('rentals.id', rentalId);
  }

  static post(data) {
    return knex.from('rentals').insert(data);
  }

  static put(rentalId, data) {
    const query = knex.from('rentals');

    if (data.status) {
      query.update('status', rentalStatus.returned);
    }

    return query.where('id', rentalId);
  }

  static delete(rentalId) {
    return knex
      .from('rentals')
      .where('id', rentalId)
      .del();
  }
}

module.exports = RentalModel;
