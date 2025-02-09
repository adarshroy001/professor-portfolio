const multer = require("multer");
const path = require("path");

// Configure Multer to accept file uploads
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only images are allowed!"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
