const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware")
const upload = require("../middleware/multer");
const { uploadProfileImage } = require("../controllers/uploadProfileImage");

router.post("/profile", protect, upload.single("image"), uploadProfileImage);

module.exports = router;