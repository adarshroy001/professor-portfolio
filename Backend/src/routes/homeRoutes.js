const express = require("express");
const { getHome, updateHome } = require("../controllers/homeController");
const upload = require("../middlewares/uploadMiddleware"); // Multer Middleware

const router = express.Router();

router.get("/", getHome);
router.put("/", upload.single("img"), updateHome); // Handle image upload

module.exports = router;
