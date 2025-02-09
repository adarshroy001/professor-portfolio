const Education = require("../models/Education");


const getEducation = async (req, res) => {
    try {
        const educations = await Education.find().sort({ year: -1 }); // Sort by year (descending)
        res.json(educations);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


const addEducation = async (req, res) => {
    try {
        const { DegreeName, CollegeName, Department, Title, Supervisor, year, collegeImg } = req.body;

        // Check if the same education entry already exists
        const existingEducation = await Education.findOne({ DegreeName, CollegeName, year });

        if (existingEducation) {
            return res.status(400).json({ message: "This education entry already exists!" });
        }

        // If not, create a new education entry
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



const deleteEducation = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res.status(404).json({ message: "Education not found" });
        }

        await education.deleteOne();
        res.json({ message: "Education deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getEducation, addEducation, deleteEducation };
