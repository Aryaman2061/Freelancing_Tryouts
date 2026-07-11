const express = require("express");
const router = express.Router();

const getProfile = require("../controllers/getProfile");

router.get("/getProfile/:userId", getProfile);

module.exports = router;