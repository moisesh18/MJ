const express = require('express');
const router = express.Router();
const Director = require('../controllers/directors.controller');
router.post('/authenticate', Director.authenticate);
router.get('/ultimorecurso', Director.prueba);
module.exports = router;
