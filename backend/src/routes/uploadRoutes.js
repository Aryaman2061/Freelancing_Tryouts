const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware")
const uploadImage = require("../middleware/uploadImage");
const { uploadProfilePicture } = require("../controllers/uploadProfilePicture");

router.post("/profile-picture", protect, uploadImage.single("profilePicture"), uploadProfilePicture);

module.exports = router;