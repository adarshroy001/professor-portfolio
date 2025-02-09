import React, { useState } from 'react';

function ContentForm({ onSubmit, initialData = null, type }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    date: '',
    media: null,
  });
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'media') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      
      // Create preview URL
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setMediaPreview(previewUrl);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      {type === 'blog' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Media (Image or Video)
          </label>
          <input
            type="file"
            name="media"
            onChange={handleChange}
            accept="image/*,video/*"
            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100
                     dark:file:bg-gray-700 dark:file:text-gray-300"
          />
          {mediaPreview && (
            <div className="mt-2">
              {formData.media?.type.startsWith('image/') ? (
                <img
                  src={mediaPreview}
                  alt="Preview"
                  className="h-32 w-auto object-cover rounded-md"
                />
              ) : (
                <video
                  src={mediaPreview}
                  className="h-32 w-auto rounded-md"
                  controls
                />
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-gray-900"
        >
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}

export default ContentForm;