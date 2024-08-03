const express = require('express');
const router = express.Router();
const teacherCtrl = require('../controllers/teacher');


router.post('/signup',teacherCtrl.signup);
router.post('/login',teacherCtrl.login);
router.get('/get/:id',teacherCtrl.getTeacher);

module.exports = router;