const cloudinary = require("../config/cloudinary");
const fs = require("fs").promises;

const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "freelancing-marketplace/profile-pictures",
                    resource_type: "image",
                    timeout: 70000,
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            stream.end(req.file.buffer);
        });

        return res.status(200).json({
            success: true,
            message: "Profile picture uploaded successfully",
            image: {
                public_id: result.public_id,
                url: result.secure_url,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const uploadDocument = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No document uploaded",
            });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "freelancing-marketplace/documents",
            resource_type: "raw",
        });

        try {
            await fs.unlink(req.file.path);
        } catch (err) {
            console.log("Failed to delete local file:", err.message);
        }

        return res.status(200).json({
            success: true,
            message: "Portfolio document uploaded successfully",
            document: {
                public_id: result.public_id,
                url: result.secure_url,
            },
        });

    } catch (error) {

        try {
            if (req.file?.path) {
                await fs.unlink(req.file.path);
            }
        } catch (err) {
            console.log("Failed to delete local file:", err.message);
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    uploadProfilePicture,
    uploadDocument,
};