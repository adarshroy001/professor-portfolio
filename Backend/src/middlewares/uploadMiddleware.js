const multer = require("multer");
const path = require("path");

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, "../uploads"); 
const fs = require("fs");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create if not exists
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
