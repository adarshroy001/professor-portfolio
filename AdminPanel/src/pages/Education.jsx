import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Education() {
  const [educations, setEducations] = useState([]);
  const [formData, setFormData] = useState({
    DegreeName: "",
    CollegeName: "",
    Department: "",
    Title: "",
    Supervisor: "",
    year: "",
    collegeImg: null, // Store file object
  });

  const [previewImg, setPreviewImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [existingImgUrl, setExistingImgUrl] = useState(null); // For retaining old image

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/education");
      setEducations(response.data);
    } catch (error) {
      console.error("Error fetching education data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, collegeImg: file });
      setPreviewImg(URL.createObjectURL(file));
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

    // Retain old image if no new file is selected
    if (isEditing && !formData.collegeImg) {
      formDataToSend.append("existingImg", existingImgUrl);
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/education/${editId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Education updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/education", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Education added successfully");
      }

      setFormData({
        DegreeName: "",
        CollegeName: "",
        Department: "",
        Title: "",
        Supervisor: "",
        year: "",
        collegeImg: null,
      });
      setPreviewImg(null);
      setIsEditing(false);
      setEditId(null);
      setExistingImgUrl(null);
      fetchEducations();
    } catch (error) {
      console.error("Error updating education:", error);
      toast.error("Failed to update education data");
    }
  };

  const handleEdit = (education) => {
    setIsEditing(true);
    setEditId(education._id);
    setFormData({
      DegreeName: education.DegreeName,
      CollegeName: education.CollegeName,
      Department: education.Department,
      Title: education.Title,
      Supervisor: education.Supervisor,
      year: education.year,
      collegeImg: null, // Keep existing image
    });

    setPreviewImg(education.collegeImg);
    setExistingImgUrl(education.collegeImg); // Retain old image path
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/education/${id}`);
      toast.success("Education deleted successfully");
      fetchEducations();
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("Failed to delete education");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {isEditing ? "Edit Education" : "Add Education"}
        </h1>
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setEditId(null);
              setFormData({
                DegreeName: "",
                CollegeName: "",
                Department: "",
                Title: "",
                Supervisor: "",
                year: "",
                collegeImg: null,
              });
              setPreviewImg(null);
              setExistingImgUrl(null);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          {[
            { label: "Degree Name", name: "DegreeName", type: "text" },
            { label: "College Name", name: "CollegeName", type: "text" },
            { label: "Department", name: "Department", type: "text" },
            { label: "Course Title", name: "Title", type: "text" },
            { label: "Supervisor Name", name: "Supervisor", type: "text" },
            { label: "Year", name: "year", type: "text" },
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

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              College Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
            {(previewImg || existingImgUrl) && (
              <img src={previewImg || existingImgUrl} alt="Preview" className="mt-2 h-24 rounded-md" />
            )}
          </div>

          <button
            type="submit"
            className="mt-5 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Education History
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {educations.map((education) => (
            <div key={education._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {education.DegreeName}
              </h3>
              {education.collegeImg && (
                <img src={education.collegeImg} alt="College" className="mt-2 h-20 rounded-md" />
              )}
              <div className="mt-4 flex space-x-2">
                <button onClick={() => handleEdit(education)} className="text-indigo-600 hover:text-indigo-700">
                  Edit
                </button>
                <button onClick={() => handleDelete(education._id)} className="text-red-600 hover:text-red-700">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Education;

