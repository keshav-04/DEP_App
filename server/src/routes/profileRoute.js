const express = require('express');
const router = express.Router();

//controllers for profile
const { getProfile, updateProfile } = require('../controllers/profile');

//auth middleware
// const requireAuth = require('../middleware/requireAuth.js');

//checks for the auth first
// router.use(requireAuth);

//profile protected routes
router.get('/:email', getProfile);
router.put('/', updateProfile);

module.exports = router;