const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

// Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "professor-portfolio", // Cloudinary folder name
        allowed_formats: ["jpg", "png", "jpeg"]
    }
});

const upload = multer({ storage });

module.exports = upload;
