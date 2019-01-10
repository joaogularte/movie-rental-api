const express = require('express');

/* Dependencias relativas */
const MovieController = require('../controllers/MovieController');
const MovieSchema = require('./schemas/MovieSchema');
const schemaValidator = require('../middlewares/schemaValidator');

const router = express.Router();

/* GET /api/movies */
router.get('/', schemaValidator(MovieSchema, 'list'), MovieController.list);

/* POST /api/movies */
router.post('/', schemaValidator(MovieSchema, 'post'), MovieController.post);

/* GET /api/movies/:id */
router.get('/:id', schemaValidator(MovieSchema, 'get'), MovieController.get);

/* PUT /api/movies/:id */
router.put('/:id', schemaValidator(MovieSchema, 'put'), MovieController.put);

/* GET /api/movies/:id */
router.delete('/:id', schemaValidator(MovieSchema, 'delete'), MovieController.delete);

module.exports = router;
