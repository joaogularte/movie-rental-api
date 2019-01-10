const express = require('express');

/* Dependencias relativas */
const UserSchema = require('./schemas/UserSchema');
const UserController = require('../controllers/UserController');
const schemaValidator = require('../middlewares/schemaValidator');

const router = express.Router();
/* GET /users */
router.get('/', UserController.list);

/* POST /api/users */
router.post('/', schemaValidator(UserSchema, 'post'), UserController.post);

/* GET /api/users/:id */
router.get('/:id', schemaValidator(UserSchema, 'get'), UserController.get);

/* PUT /api/users/:id */
router.put('/:id', schemaValidator(UserSchema, 'put'), UserController.put);

/* DELETE /api/users/:id */
router.delete('/:id', schemaValidator(UserSchema, 'delete'), UserController.delete);

module.exports = router;
