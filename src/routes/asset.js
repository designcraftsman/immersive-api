const express = require('express');
const router = express.Router();
const assetCtrl = require('../controllers/asset');
const auth = require('../middleware/auth');

router.post('/add' ,assetCtrl.addAsset);

module.exports = router;