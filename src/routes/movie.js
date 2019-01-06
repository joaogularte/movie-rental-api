const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/MovieController');

router.get('/', MovieController.list);

router.post('/', MovieController.post);

router.get('/:id', MovieController.get);

router.put('/:id', MovieController.put);

router.delete('/:id', MovieController.delete);

module.exports = router;