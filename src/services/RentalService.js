const uuidv4 = require('uuid/v4');

const RentalModel = require('../models/RentalModel');
const UserModel = require('../models/UserModel');
const MovieModel = require('../models/MovieModel');

class RentalService {
  /**
   * Retorna uma lista de rodos os alugueis.
   */
  static async list() {
    const rentals = await RentalModel.list();
    return rentals;
  }

  /**
   * Retorna o alguel que tiver o id igual a rentalId.
   * Caso o alguel não exista, retorna null
   */
  static async get(rentalId) {
    const rentals = await RentalModel.get(rentalId);
    if (!rentals[0]) {
      return null;
    }
    return rentals[0];
  }

  /**
   * Inseri um novo aluguel, abribuindo um numero uuid ao id do aluguel inserido, assim como,
   * Retorna o id do usuario inserido,
   * Caso o user relacionado ao aluguel nao exista, retorna User not found
   * Caso o movie relacionado ao alguel nao exista, retorna Movie not found
   * Caso o movie relacionado ao aluguel nao esteja disponivel, retorna Movie not available
   */
  static async post(data) {
    const user = await UserModel.get(data.idUser);
    if (!user[0]) {
      return { success: false, message: 'User not found' };
    }
    const movie = await MovieModel.getByTitle(data.titleMovie);

    if (!movie[0]) {
      return { success: false, message: 'Movie not found' };
    }
    if (movie[0].quantities < 1) {
      return { success: false, message: 'Movie not available' };
    }

    await MovieModel.decrement(data.titleMovie);
    const id = uuidv4();
    const rental = {
      id,
      titleMovie: data.titleMovie,
      idUser: data.idUser,
      status: data.status,
    };

    await RentalModel.post(rental);
    return { success: true, data: { id: rental.id } };
  }

  /**
   * Altera o aluguel que tiver o id igual a rentalId e retorna true,
   * Caso o aluguel não exista, retorna false;
   */
  static async put(rentalId, data) {
    const rental = await RentalModel.get(rentalId);
    if (!rental[0]) {
      return false;
    }
    await MovieModel.increment(rental[0].titleMovie);
    await RentalModel.put(rentalId, data);
    return true;
  }

  /**
   * Deleta o aluguel que tiver o id igual a rentalId e retorna true,
   * Caso o aluguel não exista, retorna false;
   */
  static async delete(rentalId) {
    const rental = await RentalModel.get(rentalId);
    if (!rental[0]) {
      return false;
    }
    await RentalModel.delete(rentalId);
    return true;
  }
}

module.exports = RentalService;
