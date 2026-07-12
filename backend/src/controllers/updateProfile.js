const User = require("../models/user_model");
const jwt = require("jsonwebtoken");

// Select Role (Only Once)
const selectRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!["client", "freelancer"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role selected."
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        // Prevent changing role after it has been selected
        if (user.role) {
            return res.status(400).json({
                message: "Role has already been selected."
            });
        }

        user.role = role;

        await user.save();

        const token = jwt.sign({
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )

        res.status(200).json({
            message: "Role selected successfully.",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found."
            });

        }

        if (!user.role) {

            return res.status(400).json({
                message: "Please select your role first."
            });

        }

        // ---------- Common Fields ----------

        const commonFields = [

            "firstName",
            "lastName",
            "bio",
            "phone",
            "website",
            "location",
            "profilePicture",
            "coverPicture"

        ];

        commonFields.forEach(field => {

            if (req.body[field] !== undefined) {

                user[field] = req.body[field];

            }

        });

        // ---------- Freelancer ----------

        if (user.role === "freelancer") {

            const freelancerFields = [

                "title",
                "skills",
                "experienceLevel",
                "hourlyRate",
                "languages",
                "resume",
                "portfolio"

            ];

            freelancerFields.forEach(field => {

                if (req.body[field] !== undefined) {

                    user[field] = req.body[field];

                }

            });

        }

        // ---------- Client ----------

        if (user.role === "client") {

            const clientFields = [

                "companyName",
                "companyWebsite"

            ];

            clientFields.forEach(field => {

                if (req.body[field] !== undefined) {

                    user[field] = req.body[field];

                }

            });

        }

        user.profileCompleted = true;

        await user.save();

        res.status(200).json({

            message: "Profile updated successfully.",

            user

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {
    selectRole,
    updateProfile
};