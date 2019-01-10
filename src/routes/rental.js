const express = require('express');

/* Dependencias relativas */
const RentalController = require('../controllers/RentalController');
const RentalSchema = require('./schemas/RentalSchema');
const schemaValidator = require('../middlewares/schemaValidator');

const router = express.Router();

/* GET /api/rentals */
router.get('/', RentalController.list);

/* POST /api/rentals */
router.post('/', schemaValidator(RentalSchema, 'post'), RentalController.post);

/* GET /api/rentals/:id */
router.get('/:id', schemaValidator(RentalSchema, 'get'), RentalController.get);

/* PUT /api/rentals/:id */
router.put('/:id', schemaValidator(RentalSchema, 'put'), RentalController.put);

/* DELET /api/rentals/:id */
router.delete('/:id', schemaValidator(RentalSchema, 'delete'), RentalController.delete);


module.exports = router;
