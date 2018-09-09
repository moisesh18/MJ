const express = require('express');
const router = express.Router();

const Cycles = require('../controllers/cycles.controller');
router.get('/', Cycles.get);
router.post('/', Cycles.create);
router.get('/:id', Cycles.getCycle);
router.get('/:id/enrolls', Cycles.getEnrolls);
router.put('/:id', Cycles.edit);
router.delete('/:id', Cycles.delete);

module.exports = router;