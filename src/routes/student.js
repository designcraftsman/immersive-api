const express = require('express');
const router = express.Router();
const studentCtrl = require('../controllers/student');


router.post('/add', studentCtrl.addStudent);
router.get('/', studentCtrl.getAllStudents);
router.get('/:id', studentCtrl.getStudent);
router.put('/:id', studentCtrl.updateStudent);
router.delete('/:id', studentCtrl.deleteStudent);


module.exports = router;