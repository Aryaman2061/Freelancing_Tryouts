const cloudinary = require("../config/cloudinary");

const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });
        }

        console.log("uploading...")
        console.log(req.file.size)
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "freelancing-marketplace/profile-pictures",
                    resource_type: "image",
                    timeout: 70000
                },
                (error, result) => {
                    console.log("Callback reached")
                    console.log(error)
                    console.log(result)
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
        console.dir(error, { depth: null });

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    uploadProfilePicture
};