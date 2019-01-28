const express = require('express');
const router = express.Router();
const Director = require('../controllers/directors.controller');
router.post('/authenticate', Director.authenticate);
module.exports = router;
