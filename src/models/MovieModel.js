const knex = require('../config/db');

class MovieModel {
  /* Metodos Padrões */

  /**
   * Retorna todos os registros com as colunas
   * id, title, director e quantities da tabela
   * movies
   */
  static list() {
    return knex
      .select('id', 'title', 'director', 'quantities')
      .from('movies');
  }

  /**
   * Retorna o registro com as colunas
   * id, title, director e quantities da tabela
   * movies onde movieId for igual a coluna id
   */
  static get(movieId) {
    return knex
      .select('id', 'title', 'director', 'quantities')
      .from('movies')
      .where('id', movieId);
  }

  /**
   * Realiza insert de registros na tabela movies
   */
  static post(data) {
    return knex('movies')
      .insert(data);
  } 

  /**
   * Realiza update do registro da tabela movies
   * onde movieId for igual a coluna id
   */
  static put(movieId, data) {
    const query = knex.from('movies');

    if (data.title) {
      query.update('title', data.title);
    }
    if (data.director) {
      query.update('director', data.director);
    }
    if (data.quantities) {
      query.update('quantities', data.quantities);
    }

    return query.where('id', movieId);
  }

  /**
   * Realiza delete do registro da tabela movies
   * onde movieId for igual a coluna id
   */
  static delete(movieId) {
    return knex
      .from('movies')
      .where('id', movieId)
      .del();
  }

  /* Metodos Extras */

  static like(title) {
    return knex
      .select('id', 'title', 'director', 'quantities')
      .from('movies')
      .where('title', 'like', title);
  }

  /**
   * Seleciona os campos title e quantities da tabela movies,
   * onde o parametro title for igual a coluna title
   */
  static getByTitle(title) {
    return knex
      .select('title', 'quantities')
      .from('movies')
      .where('title', title);
  }

  /**
   * Decrementa o campo quantities da tabela movies onde o
   * parametro title for igual a coluna title,
   */
  static decrement(title) {
    return knex('movies')
      .where('title', title)
      .decrement('quantities', 1);
  }
  /**
   * Incrementa o campo quantities da tabela movies onde o
   * parametro title for igual a coluna title,
   */
  static increment(title) {
    return knex('movies')
      .where('title', title)
      .increment('quantities', 1);
  }
}

module.exports = MovieModel;
