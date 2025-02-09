const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    media: { type: String, default: "" },  // Cloudinary URL
    mediaType: { type: String, enum: ["image", "video"], default: "image" }, // Type of media
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", BlogSchema);
