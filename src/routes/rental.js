const express   = require('express');
const router    = express.Router();
const RentalController = require('../controllers/RentalController');

router.get('/', RentalController.list);

router.post('/', RentalController.post);

router.get('/:id', RentalController.get);

router.put('/:id', RentalController.put);

router.delete('/:id', RentalController.delete);


module.exports = router;