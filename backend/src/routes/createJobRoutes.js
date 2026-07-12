const express = require("express");
const router = express.Router();
const { createJob } = require("../controllers/createJob");
const { isClient } = require("../middleware/authMiddleware");
const { protect } = require("../middleware/authMiddleware");

router.post("/createJob", protect, isClient, createJob);

module.exports = router;