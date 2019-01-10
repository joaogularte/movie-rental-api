const RentalService = require('../services/RentalService');
const responseError = require('./helpers');

class RentalController {
  static async list(req, res) {
    try {
      const rentals = await RentalService.list();
      res.status(200).send({ success: true, data: rentals });
    } catch (err) {
      res.status(500).send(responseError);
    }
  }

  static async get(req, res) {
    try {
      const rentalId = req.joi.params.id;

      const rental = await RentalService.get(rentalId);
      if (rental) {
        res.status(200).send({ success: true, data: rental });
      } else {
        res.status(200).send({ success: false, message: 'Rental not found' });
      }
    } catch (err) {
      res.status(200).send(responseError);
    }
  }

  static async post(req, res) {
    try {
      const rental = req.joi.body;
      const result = await RentalService.post(rental);
      if (result.success) {
        res.status(200).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (err) {
      res.status(200).send(responseError);
    }
  }

  static async put(req, res) {
    try {
      const rentalId = req.joi.params.id;
      const rental = req.joi.body;
      const updated = await RentalService.put(rentalId, rental);
      if (updated) {
        res.status(200).send({ success: true });
      } else {
        res.status(200).send({ success: false, message: 'Rental not found' });
      }
    } catch (err) {
      res.status(500).send(responseError);
    }
  }

  static async delete(req, res) {
    try {
      const rentalId = req.joi.params.id;
      const deleted = await RentalService.delete(rentalId);
      if (deleted) {
        res.status(200).send({ success: true });
      } else {
        res.status(200).send({ success: false, message: 'Rental not found' });
      }
    } catch (err) {
      res.status(500).send(responseError);
    }
  }
}

module.exports = RentalController;
