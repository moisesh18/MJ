const express = require('express');
const router = express.Router();

const Enroll = require('../controllers/enrolls.controller');
router.get('/', Enroll.get);
router.post('/', Enroll.create);
router.put('/:id', Enroll.edit);
router.delete('/:id', Enroll.delete);

module.exports = router;