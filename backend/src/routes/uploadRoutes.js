const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const { uploadProfileImage } = require("../controllers/uploadController");

router.post("/profile-image", authMiddleware, upload.single("image"), uploadProfileImage);

module.exports = router;