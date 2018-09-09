const express = require('express');
const router = express.Router();

const Student = require('../controllers/students.controller');
router.get('/', Student.getStudents);
router.post('/', Student.createStudent);
router.get('/:id', Student.getStudent);
router.put('/:id', Student.editStudent);
router.delete('/:id', Student.deleteStudent);


module.exports = router;