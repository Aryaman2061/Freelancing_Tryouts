const express = require('express');
const router = express.Router();

const { updateProfile } = require('../controllers/updateProfileController');

router.put('/updateProfile/:userId', updateProfile);

module.exports = router;