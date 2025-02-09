const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    about: { type: String, required: true },
    workPlace: { type: String, required: true },
    img: { type: String, required: true }, // Profile Image URL
});

const Home = mongoose.model("Home", homeSchema);
module.exports = Home;

