const User = require("../models/user_model");

const updateProfile = async (req, res) => {
    try {

        const { userId } = req.params;

        const {
            firstName,
            lastName,
            bio,
            location,
            website,
            phone,
            title,
            skills,
            experienceLevel,
            hourlyRate,
            languages,
            resume
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                bio,
                location,
                website,
                phone,
                title,
                skills,
                experienceLevel,
                hourlyRate,
                languages,
                resume
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    updateProfile
};