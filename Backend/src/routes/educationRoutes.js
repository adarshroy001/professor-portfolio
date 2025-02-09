const express = require("express");
const { getEducation, addEducation, deleteEducation } = require("../controllers/educationController");

const router = express.Router();

router.get("/", getEducation);
router.post("/", addEducation);
router.delete("/:id", deleteEducation);

module.exports = router;
