const express = require("express");
const ResearchPaper = require("../models/ResearchPaper.js");

const router = express.Router();

// Add a new research paper
router.post("/", async (req, res) => {
  try {
    const { title, shortDescription, fullDescription, link } = req.body;

    // Validate required fields
    if (!title || !shortDescription || !fullDescription || !link) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPaper = new ResearchPaper({ title, shortDescription, fullDescription, link });
    await newPaper.save();

    res.status(201).json({ message: "Research paper added successfully", paper: newPaper });
  } catch (error) {
    console.error("Error adding research paper:", error);
    res.status(500).json({ message: "Error adding research paper", error: error.message });
  }
});

// Fetch all research papers
router.get("/", async (req, res) => {
  try {
    const papers = await ResearchPaper.find();
    res.status(200).json(papers);
  } catch (error) {
    console.error("Error fetching research papers:", error);
    res.status(500).json({ message: "Error fetching research papers", error: error.message });
  }
});

//  Get a single research paper
router.get("/:id", async (req, res) => {
  try {
    const paper = await ResearchPaper.findById(req.params.id);
    if (!paper) return res.status(404).json({ message: "Research paper not found" });

    res.status(200).json(paper);
  } catch (error) {
    console.error("Error fetching research paper:", error);
    res.status(500).json({ message: "Error fetching research paper", error: error.message });
  }
});

// Update a research paper
router.put("/:id", async (req, res) => {
  try {
    const { title, shortDescription, fullDescription, link } = req.body;

    // Validate required fields
    if (!title || !shortDescription || !fullDescription || !link) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedPaper = await ResearchPaper.findByIdAndUpdate(
      req.params.id,
      { title, shortDescription, fullDescription, link },
      { new: true }
    );

    if (!updatedPaper) return res.status(404).json({ message: "Research paper not found" });

    res.status(200).json({ message: "Research paper updated successfully", paper: updatedPaper });
  } catch (error) {
    console.error("Error updating research paper:", error);
    res.status(500).json({ message: "Error updating research paper", error: error.message });
  }
});

// Delete a research paper
router.delete("/:id", async (req, res) => {
  try {
    const deletedPaper = await ResearchPaper.findByIdAndDelete(req.params.id);
    if (!deletedPaper) return res.status(404).json({ message: "Research paper not found" });

    res.status(200).json({ message: "Research paper deleted successfully" });
  } catch (error) {
    console.error("Error deleting research paper:", error);
    res.status(500).json({ message: "Error deleting research paper", error: error.message });
  }
});

module.exports = router;
