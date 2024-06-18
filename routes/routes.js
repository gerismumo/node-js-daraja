const express = require('express');
const controller = require('../controllers/controller');
const callBack = require('../controllers/callback');
const router  = express.Router();

router.post('/express-payment', controller.payment);
router.post('/callback', callBack)

module.exports = router;