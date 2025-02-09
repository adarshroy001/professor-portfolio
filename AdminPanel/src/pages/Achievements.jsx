import React, { useState } from 'react';
import ContentForm from '../components/ui/ContentForm';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  const handleSubmit = (formData) => {
    if (isEditing) {
      setAchievements(achievements.map(achievement => 
        achievement.id === currentAchievement.id ? { ...formData, id: achievement.id } : achievement
      ));
      setIsEditing(false);
      setCurrentAchievement(null);
    } else {
      setAchievements([...achievements, { ...formData, id: Date.now() }]);
    }
  };

  const handleEdit = (achievement) => {
    setIsEditing(true);
    setCurrentAchievement(achievement);
  };

  const handleDelete = (id) => {
    setAchievements(achievements.filter(achievement => achievement.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {isEditing ? 'Edit Achievement' : 'Add Achievement'}
        </h1>
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setCurrentAchievement(null);
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
          initialData={currentAchievement}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Achievements
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {achievement.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {achievement.description}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {achievement.date}
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(achievement)}
                  className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(achievement.id)}
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

export default Achievements;