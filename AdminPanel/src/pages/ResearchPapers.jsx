import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminResearchPapers = () => {
  const [papers, setPapers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    link: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch research papers on load
  useEffect(() => {
    fetchResearchPapers();
  }, []);

  const fetchResearchPapers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/research-papers/");
      setPapers(response.data);
    } catch (error) {
      console.error("Error fetching research papers:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/research-papers/${editId}`, formData);
        toast.success("Research paper updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/research-papers/", formData);
        toast.success("Research paper added successfully!");
      }
      resetForm();
      fetchResearchPapers();
    } catch (error) {
      console.error("Error adding/updating research paper:", error);
      toast.error("Failed to save research paper.");
    }
  };

  // Handle Edit
  const handleEdit = (paper) => {
    setIsEditing(true);
    setEditId(paper._id);
    setFormData({
      title: paper.title,
      shortDescription: paper.shortDescription,
      fullDescription: paper.fullDescription,
      link: paper.link,
    });
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/research-papers/${id}`);
      toast.success("Research paper deleted successfully!");
      fetchResearchPapers();
    } catch (error) {
      console.error("Error deleting research paper:", error);
      toast.error("Failed to delete research paper.");
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({ title: "", shortDescription: "", fullDescription: "", link: "" });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {isEditing ? "Edit Research Paper" : "Add Research Paper"}
        </h1>
        {isEditing && (
          <button
            onClick={resetForm}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          {/* Title, Short Desc, Full Desc, Link */}
          {[
            { label: "Title", name: "title", type: "text" },
            { label: "Short Description", name: "shortDescription", type: "text" },
            { label: "Full Description", name: "fullDescription", type: "textarea" },
            { label: "Link", name: "link", type: "url" },
          ].map(({ label, name, type }) => (
            <div key={name} className="mt-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="mt-2 pl-3 py-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="mt-2 pl-3 py-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-5 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* Research Paper List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Research Papers
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {papers.map((paper) => (
            <div key={paper._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{paper.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{paper.shortDescription}</p>
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 block mt-2"
              >
                Visit Research Paper
              </a>
              <div className="mt-4 flex space-x-2">
                <button onClick={() => handleEdit(paper)} className="text-indigo-600 hover:text-indigo-700">
                  Edit
                </button>
                <button onClick={() => handleDelete(paper._id)} className="text-red-600 hover:text-red-700">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminResearchPapers;
