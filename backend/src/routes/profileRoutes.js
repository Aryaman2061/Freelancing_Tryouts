const express = require("express");
const router = express.Router();

const { getProfile } = require("../controllers/getProfile");
const { selectRole, updateProfile } = require("../controllers/updateProfile");
const { protect } = require("../middleware/authMiddleware");

router.get("/",protect,getProfile);
router.put("/", protect, updateProfile);
router.put("/selectRole", protect, selectRole);

module.exports = router;