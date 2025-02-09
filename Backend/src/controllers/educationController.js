const Education = require("../models/Education");
const cloudinary = require("../utils/cloudinary"); // Import Cloudinary

// Get all education entries (Sorted by year in descending order)
const getEducation = async (req, res) => {
    try {
        const educations = await Education.find().sort({ year: -1 });
        res.json(educations);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Add new education entry
const addEducation = async (req, res) => {
    try {
        const { DegreeName, CollegeName, Department, Title, Supervisor, year } = req.body;

        // Check if the same education entry already exists
        const existingEducation = await Education.findOne({ DegreeName, CollegeName, year });

        if (existingEducation) {
            return res.status(400).json({ message: "This education entry already exists!" });
        }

        // Get Cloudinary URL
        let collegeImg = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            collegeImg = result.secure_url;
        }


        // Create a new education entry
        const newEducation = new Education({
            DegreeName,
            CollegeName,
            Department,
            Title,
            Supervisor,
            year,
            collegeImg, // Cloudinary image URL
        });

        await newEducation.save();
        res.json({ message: "Education added successfully!", education: newEducation });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Delete an education entry & remove associated image from Cloudinary
const deleteEducation = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res.status(404).json({ message: "Education not found" });
        }

        // Extract Cloudinary Public ID from URL
        if (education.collegeImg) {
            const publicId = education.collegeImg.split('/').pop().split('.')[0]; // Extract ID from URL

            // Remove image from Cloudinary
            await cloudinary.uploader.destroy(`professor-portfolio/${publicId}`);
        }

        // Delete education entry from database
        await education.deleteOne();
        res.json({ message: "Education deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const updateEducation = async (req, res) => {
    try {
        const { id } = req.params;
        const { DegreeName, CollegeName, Department, Title, Supervisor, year } = req.body;

        let education = await Education.findById(id);
        if (!education) {
            return res.status(404).json({ message: "Education not found" });
        }

        // If a new image is uploaded, replace the old one
        let collegeImg = education.collegeImg;
        if (req.file) {
            // Delete old image from Cloudinary
            if (collegeImg) {
                const publicId = collegeImg.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`professor-portfolio/${publicId}`);
            }

            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            collegeImg = result.secure_url;
        }

        // Update education entry
        education = await Education.findByIdAndUpdate(
            id,
            { DegreeName, CollegeName, Department, Title, Supervisor, year, collegeImg },
            { new: true }
        );

        res.json({ message: "Education updated successfully!", education });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


module.exports = { getEducation, addEducation, deleteEducation ,updateEducation };
