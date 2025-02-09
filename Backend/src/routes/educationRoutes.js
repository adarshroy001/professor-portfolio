const express = require("express");
const { getEducation, addEducation, deleteEducation } = require("../controllers/educationController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/", getEducation);  
router.post("/", upload.single("collegeImg"), addEducation); // Now handles file uploads
router.delete("/:id", deleteEducation);

module.exports = router;
