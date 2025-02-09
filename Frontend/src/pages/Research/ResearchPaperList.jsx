import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from '../../ThemeContext';


const ResearchPaperList = () => {
  const { isDark } = useTheme();
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/research-papers");
        setPapers(response.data);
      } catch (error) {
        console.error("Error fetching research papers:", error);
      }
    };
    fetchPapers();
  }, []);

  return (
    <div className={`min-h-[88vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 `}>

    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Research Papers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map((paper) => (
          <div key={paper._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{paper.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{paper.shortDescription}</p>
            <Link
              to={`/research-paper/${paper._id}`}
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ResearchPaperList;
