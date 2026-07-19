const express = require("express");
const router = express.Router();

const { getClients, getFreelancers } = require("../controllers/getProfile");
const { selectRole, updateProfile } = require("../controllers/updateProfile");
const { protect } = require("../middleware/authMiddleware");

router.put("/selectRole", protect, selectRole);
router.put("/", protect, updateProfile);

router.get("/clients", protect, getClients);
router.get("/freelancers", protect, getFreelancers);

module.exports = router;