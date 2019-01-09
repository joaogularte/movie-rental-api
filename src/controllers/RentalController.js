const RentalService = require('../services/RentalService');
const responseError = require('./helpers');

class RentalController {
    static async list(req, res) {
        try {
            const rentals = await RentalService.list();
            res.status(200).send({ success: true, data: rentals});
        } catch (err) {
            res.status(500).send(responseError);
        }
    }

    static async get(req, res) {
        try {
            const rental = await RentalService.get(req.params.id);
            if (rental) {
                res.status(200).send({ success: true, data: rental})
            } else {
                res.status(200).send({ success: false, message: 'Rental not found'});
            }
        } catch (err) {
            res.status(200).send(responseError);
        }
    }

    static async post(req, res){
        try {
            const result = await RentalService.post(req.body);
            if (result.success) {
                res.status(200).send(result);
            } else {
                res.status(200).send(result);
            }
        } catch (err) {
            res.status(200).send(responseError);
        }
    }

    static async put(req, res){
        try {
            const updated = await RentalService.put(req.params.id, req.body);
            if (updated) {
                res.status(200).send({ success: true });
            } else {
                res.status(200).send({ success: false, message: 'Rental not found' })
            }
        } catch (err) {
            res.status(500).send(responseError);
        }
    }

    static async delete(req, res){
        try{
            const deleted = await RentalService.delete(req.params.id);
            if (deleted) {
                res.status(200).send({ success: true })
            } else {
                res.status(200).send({ success: false, message: 'Rental not found' })
            }
        } catch (err) {
            res.status(500).send(responseError);
        }
    }
}

module.exports = RentalController;