const user = require("../models/userModel");

const updateProfile = async (req, res) => {
    try{
        const { userId } = req.params;

        const{firstName,lastName,
            bio,location,webiste,
            phone,title,skills,experienceLevel,
            hourlyRate,languages,
            resume} = req.body;

            const user = await user.findByIdAndUpdate(userId),

            if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user,
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
}

        
    
