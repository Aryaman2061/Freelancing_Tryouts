const User = require("../models/user_model");

const getClients = async (req, res) => {

    try {

        const clients = await User.find({ role: "client" }).select("-password");

        res.status(200).json({ success: true, message: "Clients fetched successfully", clients });


    } catch (error) {

        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const getFreelancers = async (req, res) => {

    try {

        const freelancers = await User.find({ role: "freelancer" }).select("-password");

        res.status(200).json({ success: true, message: "Freelancers fetched successfully", freelancers });

    } catch (error) {

        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

module.exports = {
    getClients,
    getFreelancers
};