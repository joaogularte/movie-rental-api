const express = require('express');

/* Dependencias relativas */
const AuthController = require('../controllers/AuthController');
const AuthSchema = require('./schemas/AuthSchema');
const schemaValidator = require('../middlewares/schemaValidator');

const router = express.Router();

/* POST /api/token */
router.post('/', schemaValidator(AuthSchema, 'post'), AuthController.post);

module.exports = router;
