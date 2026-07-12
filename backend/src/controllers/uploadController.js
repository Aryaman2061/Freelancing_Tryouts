const User = require("../models/user_model");

const uploadProfileImage = async (req, res) => {

    try {
        
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                profilePicture: req.file.path
            },
            {
                new: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Profile image uploaded",
            image: req.file.path,
            user
        });

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    uploadProfileImage,
};