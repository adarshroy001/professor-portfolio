const express = require("express");
const { getHome, updateHome } = require("../controllers/homeController");
const upload = require("../middlewares/uploadMiddleware"); // Multer Middleware

const router = express.Router();

router.get("/", getHome);
router.put("/update", upload.single("img"), updateHome); // "img" must match frontend field name

module.exports = router;
