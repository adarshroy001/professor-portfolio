const Home = require("../models/Home");


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
        const { name, about, workPlace, img } = req.body;
        let home = await Home.findOne();

        if (home) {
            home.name = name;
            home.about = about;
            home.workPlace = workPlace;
            home.img = img;
        } else {
            home = new Home({ name, about, workPlace, img });
        }

        await home.save();
        res.json({ message: "Home data updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getHome, updateHome };
