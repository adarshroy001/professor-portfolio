const Education = require("../models/Education");


const getEducation = async (req, res) => {
    try {
        const education = await Education.find();
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


const addEducation = async (req, res) => {
    try {
        const { DegreeName, CollegeName, Department, Title, Supervisor, year, collegeImg } = req.body;

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
        res.json({ message: "Education added successfully" });
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
