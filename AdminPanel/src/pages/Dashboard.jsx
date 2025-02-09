import React from 'react';

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {['Education', 'Experience', 'Research Papers', 'Achievements', 'Blogs'].map((section) => (
          <div
            key={section}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{section}</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage your {section.toLowerCase()} content
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;