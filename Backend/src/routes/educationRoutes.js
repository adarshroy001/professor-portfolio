const express = require("express");
const { addEducation, getEducation, deleteEducation } = require("../controllers/educationController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/", getEducation);
router.post("/", upload.single("collegeImg"), addEducation);
router.delete("/:id", deleteEducation);

module.exports = router;
