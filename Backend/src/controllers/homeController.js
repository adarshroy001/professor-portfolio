const Home = require("../models/Home");
const cloudinary = require("../utils/cloudinary");

const getHome = async (req, res) => {
    try {
        const home = await Home.findOne(); // Fetch only one home entry
        res.json(home);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateHome = async (req, res) => {
    try {
        const { name, about, workPlace } = req.body;
        let home = await Home.findOne();
        
        let imageUrl = home?.img || ""; // Default to existing image

        // If an image is uploaded, upload it to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url; // Get Cloudinary image URL
        }

        if (home) {
            home.name = name;
            home.about = about;
            home.workPlace = workPlace;
            home.img = imageUrl;
        } else {
            home = new Home({ name, about, workPlace, img: imageUrl });
        }

        await home.save();
        res.json({ message: "Home data updated successfully", home });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { getHome, updateHome };
