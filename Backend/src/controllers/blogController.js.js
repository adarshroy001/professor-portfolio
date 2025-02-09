const Blog = require("../models/Blog");
const cloudinary = require("../utils/cloudinary"); // Import Cloudinary

// Add new blog entry
const addBlog = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Cloudinary Upload Logic
        let mediaUrl = "";
        let mediaType = "";

        if (req.file) {
            const fileMimeType = req.file.mimetype;

            if (fileMimeType.startsWith("image/")) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "professor-portfolio",
                });
                mediaUrl = result.secure_url;
                mediaType = "image";
            } else if (fileMimeType.startsWith("video/")) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    resource_type: "video",
                    folder: "professor-portfolio",
                });
                mediaUrl = result.secure_url;
                mediaType = "video";
            } else {
                return res.status(400).json({ message: "Invalid media file type" });
            }
        }

        // Create a new blog entry
        const newBlog = new Blog({
            title,
            description,
            media: mediaUrl, // Store media URL
            mediaType, // Store media type (image/video)
        });

        await newBlog.save();
        res.json({ message: "Blog added successfully!", blog: newBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};






// Get all blogs (with optional search)
const getBlogs = async (req, res) => {
    try {
        const searchQuery = req.query.search || "";
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } }
            ]
        }).sort({ createdAt: -1 });

        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};




const updateBlog = async (req, res) => {
    try {
        const { title, description, mediaType } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        let mediaUrl = blog.media;
        if (req.file) {
            // Delete old media from Cloudinary
            if (blog.media) {
                const publicId = blog.media.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`professor-portfolio/${publicId}`);
            }

            // Upload new media
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: mediaType === "video" ? "video" : "image"
            });
            mediaUrl = result.secure_url;
        }

        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.media = mediaUrl;
        blog.mediaType = mediaType || blog.mediaType;

        await blog.save();
        res.json({ message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        if (blog.media) {
            const publicId = blog.media.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`professor-portfolio/${publicId}`);
        }

        await blog.deleteOne();
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};



module.exports = { getBlogs, addBlog, updateBlog ,deleteBlog };