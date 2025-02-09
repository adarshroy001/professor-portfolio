import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from '../../ThemeContext';


const ResearchPaperDetail = () => {
    const { id } = useParams();
    const { isDark } = useTheme();
    const [paper, setPaper] = useState(null);

    useEffect(() => {
        const fetchPaper = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/research-papers/${id}`);
                setPaper(response.data);
            } catch (error) {
                console.error("Error fetching research paper:", error);
            }
        };
        fetchPaper();
    }, [id]);

    if (!paper) return <div className="text-center text-gray-600">Loading...</div>;

    return (
        <div className={`min-h-[88vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 `}>

            <div className={`container mx-auto p-6 min-h-screen flex flex-col items-center justify-center`}>
                <div className={`shadow-lg rounded-lg p-6 w-full max-w-2xl  ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
                    <h1 className="text-2xl font-bold">{paper.title}</h1>
                    <p className=" mt-4">{paper.fullDescription}</p>
                    <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Visit
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResearchPaperDetail;
