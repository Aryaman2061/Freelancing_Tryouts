const express = require('express');
const router = express.Router();

const { getProfile } = require("../controllers/getProfile");
const { selectRole, updateProfile } = require('../controllers/updateProfile');
const { protect } = require('../middleware/authMiddleware');

router.put('/selectRole', protect, selectRole);
router.put('/', protect, updateProfile);
router.get("/", protect, getProfile);

module.exports = router;