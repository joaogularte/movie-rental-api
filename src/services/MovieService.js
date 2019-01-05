const knex = require('../config/db');
const MovieModel = require('../models/MovieModel');

class MovieService {
    static async list(){
        const records = await MovieModel.list();
        return records;
    }

    static async get(movieId){
        const records = await MovieModel.get(movieId);
        if(!records){
            return null
        }
        return records[0];
    }

    static async post(data){
        const records = MovieModel.post(data);
        return records;
    }

    static put(movieId, data){
        knex.transaction(async trx => {
            const movie = await MovieModel.get(movieId).transacting(trx);
            if(!movie){
                return false;
            }
            await MovieModel.put(movie.id, data).transacting(trx);
            return true;
        })
    }
    
    static delete(movieId){
        knex.transaction(async trx => {
            const movie = await MovieModel.get(movieId).transacting(trx);
            if(!movie){
                return false;
            }
            await MovieModel.delete(movie.id).transacting(trx);
            return true;
        })
    }

    static async like(title){
        const records = await MovieModel.like(title);
        if(!records){
            return null
        }
        return records;
    }

    static decrement(movieId){
        knex.transaction(async trx => {
            const movie = await MovieModel.get(movieId).transacting(trx);
            if(!movie){
                return null;
            }
            const records = await MovieModel.decrement(movie.id).transacting(trx);
            return records;
        })
    }

    static increment(movieId){
        knex.transaction(async trx => {
            const movie = await MovieModel.get(movieId).transacting(trx);
            if(!movie){
                return null;
            }
            const records = await MovieModel.increment(movie.id).transacting(trx);
            return records;
        })
    }
}

module.exports = MovieService;