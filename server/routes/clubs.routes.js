const express = require('express');
const router = express.Router();

const Club = require('../controllers/clubs.controller');
router.get('/', Club.get);
router.post('/', Club.create);
router.get('/enrolls', Club.getEnrolls);
router.get('/:id', Club.getClub);
router.get('/:id/directors', Club.getDirectors);
router.put('/:id', Club.edit);
router.delete('/:id', Club.delete);

module.exports = router;