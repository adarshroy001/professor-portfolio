import React, { useState } from 'react';
import ContentForm from '../components/ui/ContentForm';

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);

  const handleSubmit = (formData) => {
    if (isEditing) {
      setExperiences(experiences.map(exp => 
        exp.id === currentExperience.id ? { ...formData, id: exp.id } : exp
      ));
      setIsEditing(false);
      setCurrentExperience(null);
    } else {
      setExperiences([...experiences, { ...formData, id: Date.now() }]);
    }
  };

  const handleEdit = (experience) => {
    setIsEditing(true);
    setCurrentExperience(experience);
  };

  const handleDelete = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {isEditing ? 'Edit Experience' : 'Add Experience'}
        </h1>
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setCurrentExperience(null);
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
          initialData={currentExperience}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Experience History
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {experience.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {experience.description}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {experience.date}
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(experience)}
                  className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(experience.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
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

export default Experience;