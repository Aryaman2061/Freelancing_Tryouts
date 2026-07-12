const User = require("../models/user_model");

const getProfile = async (req, res) => {
    try {

        // const { userId } = req.params;

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });

    }
};

module.exports = {
    getProfile
};