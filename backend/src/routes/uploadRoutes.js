const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const uploadImage = require("../middleware/uploadImage");
const uploadFile = require("../middleware/multer");

const { uploadProfilePicture, uploadDocument } = require("../controllers/uploading");

router.post("/profile-picture", protect, uploadImage.single("profilePicture"), uploadProfilePicture);
router.post("/document", protect, uploadFile.single("document"), uploadDocument);

module.exports = router;