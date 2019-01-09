const knex = require('../config/db');

class MovieModel {

    /* Metodos Padrões */
    static list(){
        return knex
            .select('id', 'title', 'director', 'quantities')
            .from('movies');
    }

    static get(movieId){
        return knex
            .select('id', 'title', 'director', 'quantities')
            .from('movies')
            .where('id', movieId);
    }

    static post(data){
        return knex('movies')
            .insert(data);
    }

    static put(movieId, data){
        const query = knex.from('movies');

        if(data.title){
            query.update('title', data.title);
        }
        if(data.director){
            query.update('director', data.director);
        }
        if(data.quantities){
            query.update('quantities', data.quantities);
        }

        return query.where('id', movieId);
    }

    static delete(movieId){
        return knex
            .from('movies')
            .where('id', movieId)
            .del();
    }

    /* Metodos Extras */

    static like(title){
        return knex
             .select('id', 'title', 'director', 'quantitties')
             .from('movies')
             .where('title', 'like', title);
    }

    static getByTitle(title){
        return knex
            .select('title', 'quantities')
            .from('movies')
            .where('title', title);
    }

    static decrement(title){
        return knex('movies')
            .where('title', title)
            .decrement('quantities', 1);
    }

    static increment(title){
        return knex('movies')
            .where('title', title)
            .increment('quantities', 1);
    }

}

module.exports = MovieModel;