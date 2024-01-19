const express = require('express');
const router = express.Router();
const {sendotpController, verifyotpController} = require('../controllers/otp.js');

router.post('/sendotp', sendotpController);
router.post('/verifyotp', verifyotpController);

module.exports = router;