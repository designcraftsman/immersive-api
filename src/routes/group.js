const express = require('express');
const router = express.Router();
const groupCtrl = require('../controllers/group');
const auth = require('../middleware/auth');

router.post('/add', auth ,groupCtrl.addGroup);
router.delete('/delete/:id', auth, groupCtrl.deleteGroup);
router.get('/get/:id', auth, groupCtrl.getGroup);
router.get('/', auth, groupCtrl.getAllGroups);
router.put('/update/:id', auth, groupCtrl.updateGroup);

module.exports = router;