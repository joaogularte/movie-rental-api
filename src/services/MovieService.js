const uuidv4 = require('uuid/v4');
const knex = require('../config/db');

const MovieModel = require('../models/MovieModel');

class MovieService {
    static async list(){
        const records = await MovieModel.list();
        return records;
    }

    static async get(movieId){
        const records = await MovieModel.get(movieId);
        if(!records[0]){
            return null
        }
        return records[0];
    }

    static async post(data){
        const id = uuidv4();
        const movie = {
            id: id,
            title: data.title,
            director: data.director,
            quantities: data.quantities
        }
        await MovieModel.post(movie);
        return { id: movie.id };
    }

    static async put(movieId, data){
        const movie = await MovieModel.get(movieId);
        if(!movie[0]){
            return false;
        }
        await MovieModel.put(movieId, data);
        return true;
    }
    
    static async delete(movieId){
        const movie = await MovieModel.get(movieId);
        if(!movie[0]){
            return false;
        }
        await MovieModel.delete(movieId);
        return true;
    }

    static async like(title){
        const records = await MovieModel.like(title);
        if(!records[0]){
            return null
        }
        return records;
    }

    static async decrement(movieId){
        const movie = await MovieModel.get(movieId)
        if(!movie[0]){
            return null;
        }
        const records = await MovieModel.decrement(movieId);
        return records;
    }

    static async increment(movieId){
        const movie = await MovieModel.get(movieId);
        if(!movie[0]){
            return null;
        }
        const records = await MovieModel.increment(movieId);
        return records;
    
    }
}

module.exports = MovieService;