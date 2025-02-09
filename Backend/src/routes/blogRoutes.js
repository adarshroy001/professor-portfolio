const express = require("express");
const { addBlog, getBlogs, updateBlog, deleteBlog } = require("../controllers/blogController.js");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/", getBlogs);
router.post("/", upload.single("media"), addBlog);
router.put("/:id", upload.single("media"), updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;