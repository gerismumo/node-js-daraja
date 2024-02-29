const express = require('express');
const controller = require('../controllers/controller');
const router  = express.Router();

router.post('/text-form', controller.payment);

module.exports = router;