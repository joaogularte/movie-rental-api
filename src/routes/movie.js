const express = require('express');

const router = express.Router();
const MovieController = require('../controllers/MovieController');
const MovieSchema = require('./schemas/MovieSchema');
const schemaValidator = require('../middlewares/schemaValidator');

router.get('/', MovieController.list);

router.post('/', schemaValidator(MovieSchema, 'post'), MovieController.post);

router.get('/:id', schemaValidator(MovieSchema, 'get'), MovieController.get);

router.put('/:id', schemaValidator(MovieSchema, 'put'), MovieController.put);

router.delete('/:id', schemaValidator(MovieSchema, 'delete'), MovieController.delete);

module.exports = router;
