const fs = require("fs").promises;
const cloudinary = require("../config/cloudinary");

const uploadProfileImage = async (req, res, next) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "koi photo nahi mili humei" });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_images",
    });

    try {
      await fs.unlink(req.file.path);
    } catch (err) {
      console.log("file delete nahi hui");
    }

    res.json({
      success: true,
      image: result.secure_url,
      public_id: result.public_id,
    });

  } catch (err) {

    try {
      await fs.unlink(req.file.path);
    } catch (err) {
      console.log("file delete nahi hui");
    }

    next(err);

  }
};

module.exports = { uploadProfileImage };