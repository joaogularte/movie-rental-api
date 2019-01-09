const uuidv4 = require('uuid/v4');

const knex = require('../config/db');
const RentalModel = require('../models/RentalModel');
const UserModel = require('../models/UserModel');
const MovieModel = require('../models/MovieModel');

class RentalService {
    static async list(){
        const rentals = await RentalModel.list();
        return rentals;
    }

    static async get(rentalId){
        const rentals = await RentalModel.get(rentalId);
        if(!rentals){
            return null;
        }
        return rentals[0];
    }

    static async post(data){
        
        const user = await UserModel.get(data.idUser);
        if (!user[0]) {
            return { success: false, message: 'User not found' }
        }
        const movie = await MovieModel.getByTitle(data.titleMovie);
        
        if (!movie[0]) {
            return { success: false, message: 'Movie not found' };
        }
        if (movie[0].quantities < 1){
            return { success: false, message: 'Movie not available' }
        }

        await MovieModel.decrement(data.titleMovie);
        const id = uuidv4();
        const rental = {
            id: id,
            titleMovie: data.titleMovie,
            idUser: data.idUser,
            status: data.status
        }
        
        await RentalModel.post(rental);
        return { success: true, data: { id: rental.id } };
    }

    static async put(rentalId, data){
        
        const rental = await RentalModel.get(rentalId);
        if(!rental[0]){
            return false;
        }
        await MovieModel.increment(rental[0].titleMovie);
        await RentalModel.put(rentalId, data);
        return true;
    
    }

    static async delete(rentalId){
        const rental = await RentalModel.get(rentalId);
        if(!rental[0]){
            return false;
        }
        await RentalModel.delete(rentalId);
        return true;
    }
}

module.exports = RentalService;