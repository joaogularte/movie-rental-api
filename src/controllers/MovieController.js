const MovieService = require('../services/MovieService');
const responseError = require('./helpers');

class MovieController {
  /**
   * Retorna uma lista todos os filmes, ou, se o parametro title for passado via query,
   * retorna o(s) filme(s), onde o title do filme for igual ao parametro passado
   */
  static async list(req, res) {
    // try {
    const title = req.joi.params.title;
    const movies = await MovieService.list(title);
    res.status(200).send({ success: true, data: movies });
    // } catch (err) {
    //  res.status(500).send(responseError);
    // }
  }

  /**
   * Retorna um filme, onde o id do filme for igual ao parametro movieId,
   * Caso o filme não exista retorne Movie not found
   */
  static async get(req, res) {
    try {
      const movieId = req.joi.params.id;
      const movie = await MovieService.get(movieId);
      if (movie) {
        res.status(200).send({ success: true, data: movie });
      } else {
        res.status(200).send({ success: false, message: 'Movie not found' });
      }
    } catch (err) {
      res.status(500).send(responseError);
    }
  }

  /**
   * Adicionada um filme
   */
  static async post(req, res) {
    try {
      const movie = req.joi.body;
      const id = await MovieService.post(movie);
      res.status(201).send({ success: true, data: id });
    } catch (err) {
      res.status(500).send(responseError);
    }
  }

  /**
   * Altera o filme que tiver o id igual ao paremetro movieId,
   * Caso o filme não exista retorne Movie not found
   */
  static async put(req, res) {
    try {
      const movieId = req.joi.params.id;
      const movie = req.joi.body;
      const updated = await MovieService.put(movieId, movie);
      if (updated) {
        res.status(200).send({ success: true });
      } else {
        res.status(200).send({ success: false, message: 'Movie not found' });
      }
    } catch (err) {
      res.status(500).send(responseError);
    }
  }

  /**
   * Excluí o filme que tiver o id igual ao paremetro movieId,
   * Caso o filme não exista retorne Movie not found
   */
  static async delete(req, res) {
    try {
      const movieId = req.joi.params.id;
      const deleted = await MovieService.delete(movieId);
      if (deleted) {
        res.status(200).send({ success: true });
      } else {
        res.status(200).send({ success: false, message: 'Movie not found' });
      }
    } catch (err) {
      res.status(500).send(responseError);
    }
  }
}


module.exports = MovieController;
