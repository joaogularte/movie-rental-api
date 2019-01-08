const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.list);

router.post('/', UserController.post);

router.get('/:id', UserController.get);

router.put('/:id', UserController.put);

router.delete('/:id', UserController.delete);

module.exports = router;