import React, { useState } from 'react';
import ContentForm from '../components/ui/ContentForm';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  const handleSubmit = (formData) => {
    if (isEditing) {
      setBlogs(blogs.map(blog => 
        blog.id === currentBlog.id ? { ...formData, id: blog.id } : blog
      ));
      setIsEditing(false);
      setCurrentBlog(null);
    } else {
      setBlogs([...blogs, { ...formData, id: Date.now() }]);
    }
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setCurrentBlog(blog);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {isEditing ? 'Edit Blog' : 'Create Blog'}
        </h1>
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setCurrentBlog(null);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <ContentForm
          onSubmit={handleSubmit}
          initialData={currentBlog}
          type="blog"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Blog Posts
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
            >
              {blog.media && blog.media.type.startsWith('image/') && (
                <img
                  src={URL.createObjectURL(blog.media)}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              {blog.media && blog.media.type.startsWith('video/') && (
                <video
                  src={URL.createObjectURL(blog.media)}
                  className="w-full h-48 object-cover"
                  controls
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {blog.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {blog.description}
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {blog.date}
                </p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;