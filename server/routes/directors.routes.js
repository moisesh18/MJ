const express = require('express');
const router = express.Router();

const Director = require('../controllers/directors.controller');
router.get('/', Director.getDirectors);
router.post('/', Director.createDirector);
router.get('/:id', Director.getDirector);
router.put('/:id', Director.editDirector);
router.delete('/:id', Director.deleteDirector);

module.exports = router;