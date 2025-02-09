const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    DegreeName: { type: String, required: true },
    CollegeName: { type: String, required: true },
    Department: { type: String, required: true },
    Title: { type: String, required: true },
    Supervisor: { type: String, required: true },
    year: { type: String, required: true },
    collegeImg: { type: String }, // Image URL field
});

module.exports = mongoose.model("Education", educationSchema);
