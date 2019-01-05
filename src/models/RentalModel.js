const knex = require('../config/db');
const rentalStatus = require('./status/rental.json');

class RentalModel{
    static list(){
        return knex
                .select('id', 'titleMovie', 'user.name', 'user.email', 'status')
                .from('rentals')
                .innerJoin('users', 'rentals.idUser', 'users.id');
    }

    static get(rentalId){
        return knex
                .select('id', 'titleMovie', 'user.name', 'user.email')
                .from('rentals')
                .innerJoin('users', 'rentals.idUser', 'users.id')
                .where('id', rentalId);
    }

    static post(data){
        return knex.from('rentals').insert(data);
    }

    static put(rentalId, data){
        const query = knex.from('rentals');

        if(data.status){
            query.update('status', rentalStatus.returned)
        }

        return query.where('id', rentalId);
    }

    static delete(rentalId){
        return knex
            .from('rentals')
            .where('id', rentalId)
            .del();
    }
}

module.exports = RentalModel;