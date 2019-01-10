const express = require('express');

const router = express.Router();
const RentalController = require('../controllers/RentalController');
const RentalSchema = require('./schemas/RentalSchema');
const schemaValidator = require('../middlewares/schemaValidator');

router.get('/', RentalController.list);

router.post('/', schemaValidator(RentalSchema, 'post'), RentalController.post);

router.get('/:id', schemaValidator(RentalSchema, 'get'), RentalController.get);

router.put('/:id', schemaValidator(RentalSchema, 'put'), RentalController.put);

router.delete('/:id', schemaValidator(RentalSchema, 'delete'), RentalController.delete);


module.exports = router;
