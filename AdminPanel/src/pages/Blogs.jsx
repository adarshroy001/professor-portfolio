import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: null, // File object for image/video
    mediaType: "image", // Default to image
  });

  const [previewMedia, setPreviewMedia] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [existingMediaUrl, setExistingMediaUrl] = useState(null); // Retain old media

  useEffect(() => {
    fetchBlogs();
    console.log(blogs);

  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs/');
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, media: file });
      setPreviewMedia(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Retain old media if no new file is selected
    if (isEditing && !formData.media) {
      formDataToSend.append("existingMedia", existingMediaUrl);
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/blogs/${editId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Blog updated successfully");
      } else {
        await axios.post(`http://localhost:5000/api/blogs`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Blog added successfully");
      }

      // Reset form
      setFormData({ title: "", description: "", media: null, mediaType: "image" });
      setPreviewMedia(null);
      setIsEditing(false);
      setEditId(null);
      setExistingMediaUrl(null);
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setEditId(blog._id);
    setFormData({
      title: blog.title,
      description: blog.description,
      media: null, // Keep existing media
      mediaType: blog.mediaType,
    });

    setPreviewMedia(blog.media);
    setExistingMediaUrl(blog.media); // Retain old media
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {isEditing ? "Edit Blog" : "Add Blog"}
        </h1>
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setEditId(null);
              setFormData({ title: "", description: "", media: null, mediaType: "image" });
              setPreviewMedia(null);
              setExistingMediaUrl(null);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          {/* Title & Description */}
          {[
            { label: "Blog Title", name: "title", type: "text" },
            { label: "Description", name: "description", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="mt-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="mt-2 pl-3 py-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          ))}

          {/* Media Type Selection */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Media Type
            </label>
            <select
              name="mediaType"
              value={formData.mediaType}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {/* Media Upload */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Media
            </label>
            <input
              type="file"
              accept={formData.mediaType === "image" ? "image/*" : "video/*"}
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
            {(previewMedia || existingMediaUrl) && (
              <img src={previewMedia || existingMediaUrl} alt="Preview" className="mt-2 h-24 rounded-md" />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-5 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* Blog List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Blog Posts
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{blog.title}</h3>
              {blog.mediaType === "video" ? (
                <video className="mt-2 w-full h-20 rounded-md" controls>
                  <source src={blog.media} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={blog.media} alt="Blog" className="mt-2 h-20 rounded-md" />
              )}

              <div className="mt-4 flex space-x-2">
                <button onClick={() => handleEdit(blog)} className="text-indigo-600 hover:text-indigo-700">Edit</button>
                <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
