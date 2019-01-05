const knex = require('../config/db');
const RentalModel = require('../models/RentalModel');

class RentalService {
    static async list(){
        const records = await RentalModel.list();
        return records;
    }

    static async get(rentalId){
        const records = await RentalModel.get(rentalId);
        if(!records){
            return null;
        }
        return records;
    }

    static async post(data){
        const records = await RentalModel.post(data);
        return records;
    }

    static async put(rentalId, data){
        knex.transaction(async trx => {
            const rental = await RentalModel.get(rentalId).transacting(trx);
            if(!rental){
                return false;
            }
            await RentalModel.put(rental.id, data).transacting(trx);
            return true;
        })
    }

    static async delete(rentalId){
        knex.transaction(async trx => {
            const rental = await RentalModel.get(rentalId).transacting(trx);
            if(!rental){
                return false;
            }
            await RentalModel.delete(rental.id).transacting(trx);
            return true;
        })
    }
}

module.exports = RentalService;