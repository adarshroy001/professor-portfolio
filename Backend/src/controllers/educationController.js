const Education = require("../models/Education");
const fs = require("fs");
const path = require("path");

// Get all education entries (Sorted by year in descending order)
const getEducation = async (req, res) => {
    try {
        const educations = await Education.find().sort({ year: -1 });
        res.json(educations);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const addEducation = async (req, res) => {
    try {
        const { DegreeName, CollegeName, Department, Title, Supervisor, year } = req.body;
        const collegeImg = req.file ? `/uploads/${req.file.filename}` : null; // Store image path

        // Check if the same education entry already exists
        const existingEducation = await Education.findOne({ DegreeName, CollegeName, year });

        if (existingEducation) {
           
            if (req.file) {
                fs.unlinkSync(path.join(__dirname, `../../uploads/${req.file.filename}`));
            }
            return res.status(400).json({ message: "This education entry already exists!" });
        }

        // Create a new education entry
        const newEducation = new Education({
            DegreeName,
            CollegeName,
            Department,
            Title,
            Supervisor,
            year,
            collegeImg,
        });

        await newEducation.save();
        res.json({ message: "Education added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// delete an education entry & remove associated image
const deleteEducation = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res.status(404).json({ message: "Education not found" });
        }

        // Remove image file if it exists
        if (education.collegeImg) {
            const filePath = path.join(__dirname, `../../${education.collegeImg}`);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await education.deleteOne();
        res.json({ message: "Education deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getEducation, addEducation, deleteEducation };

