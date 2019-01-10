const uuidv4 = require('uuid/v4');

const MovieModel = require('../models/MovieModel');

class MovieService {

  /**
   * Retorna uma lista de rodos os filmes.
   * Se o parametro title exisir retorna os titulos como title
   * Caso title nao exista, retorna a lista de todos os filmes 
   */
  static async list(title) {
    if(title){
      const records = await MovieModel.like(title);
    }else{
      const records = await MovieModel.list();
    }
    return records;
  }

  /**
   * Retorna o filme que tiver o id igual a movieId.
   * Caso o filme não exista, retorna null 
   */
  static async get(movieId) {
    const records = await MovieModel.get(movieId);
    if (!records[0]) {
      return null;
    }
    return records[0];
  }

  /**
   * Inseri um novo filme, abribuindo um numero uuid ao id do filme inserido.
   * Retorna o id do filme inserido 
   */
  static async post(data) {
    const id = uuidv4();
    const movie = {
      id,
      title: data.title,
      director: data.director,
      quantities: data.quantities,
    };
    await MovieModel.post(movie);
    return { id: movie.id };
  }

  /**
   * Altera o filme que tiver o id igual a movieId e retorna true,
   * Caso o filme não exista, retorna false;
   */
  static async put(movieId, data) {
    const movie = await MovieModel.get(movieId);
    if (!movie[0]) {
      return false;
    }
    await MovieModel.put(movieId, data);
    return true;
  }

  /**
   * Deleta o filme que tiver o id igual a movieId e retorna true,
   * Caso o filme não exista, retorna false;
   */
  static async delete(movieId) {
    const movie = await MovieModel.get(movieId);
    if (!movie[0]) {
      return false;
    }
    await MovieModel.delete(movieId);
    return true;
  }

  /**
   * Decrementa o campo quantities do filme que tiver o id igual a movieId,
   * Caso o filme não exista, retorna null;
   */
  static async decrement(movieId) {
    const movie = await MovieModel.get(movieId);
    if (!movie[0]) {
      return null;
    }
    const records = await MovieModel.decrement(movieId);
    return records;
  }

  /**
   * Incrementa o campo quantities do filme que tiver o id igual a movieId,
   * Caso o filme não exista, retorna null;
   */
  static async increment(movieId) {
    const movie = await MovieModel.get(movieId);
    if (!movie[0]) {
      return null;
    }
    const records = await MovieModel.increment(movieId);
    return records;
  }
}

module.exports = MovieService;
