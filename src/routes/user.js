const express = require('express');

const UserSchema = require('./schemas/UserSchema');
const UserController = require('../controllers/UserController');
const schemaValidator = require('../middlewares/schemaValidator');

const router = express.Router();

router.get('/', UserController.list);

router.post('/', schemaValidator(UserSchema, 'post'), UserController.post);

router.get('/:id', schemaValidator(UserSchema, 'get'), UserController.get);

router.put('/:id', schemaValidator(UserSchema, 'put'), UserController.put);

router.delete('/:id', schemaValidator(UserSchema, 'delete'), UserController.delete);

module.exports = router;
