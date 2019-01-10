const express = require('express');

const router = express.Router();
const AuthController = require('../controllers/AuthController');
const AuthSchema = require('./schemas/AuthSchema');
const schemaValidator = require('../middlewares/schemaValidator');

router.post('/', schemaValidator(AuthSchema, 'post'), AuthController.post);

module.exports = router;
