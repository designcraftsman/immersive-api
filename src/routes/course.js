const express = require('express');
const router = express.Router();
const courseCtrl = require('../controllers/course');
const auth = require('../middleware/auth');

router.post('/add' ,auth,courseCtrl.addCourse);
router.get('/get/:id',auth,courseCtrl.getCourse);
router.get('/',auth,courseCtrl.getAllCourses);
router.delete('/delete/:id',auth,courseCtrl.deleteCourse);
router.put('/update/:id',auth,courseCtrl.updateCourse);

module.exports = router;