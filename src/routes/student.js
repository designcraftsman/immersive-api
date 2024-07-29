const express = require('express');
const router = express.Router();
const studentCtrl = require('../controllers/student');
const auth = require('../middleware/auth');

router.post('/add', auth ,studentCtrl.addStudent);
router.get('/',auth ,studentCtrl.getAllStudents);
router.get('/:id',auth ,studentCtrl.getStudent);
router.put('/:id',auth ,studentCtrl.updateStudent);
router.delete('/:id',auth ,studentCtrl.deleteStudent);


module.exports = router;