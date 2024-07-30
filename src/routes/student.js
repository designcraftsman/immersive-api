const express = require('express');
const router = express.Router();
const studentCtrl = require('../controllers/student');
const auth = require('../middleware/auth');

router.post('/add' ,auth,studentCtrl.addStudent);
router.get('/get/:id',auth,studentCtrl.getStudent);
router.get('/',auth,studentCtrl.getAllStudents);
router.delete('/delete/:id',auth,studentCtrl.deleteStudent);
router.put('/update/:id',auth,studentCtrl.updateStudent);

module.exports = router;