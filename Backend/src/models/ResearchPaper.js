const mongoose = require("mongoose");

const ResearchPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true }, // Change from 'description' if this is intended
  fullDescription: { type: String, required: true },  // Add full description if needed
  link: { type: String, required: true }
});

module.exports = mongoose.model("ResearchPaper", ResearchPaperSchema);
