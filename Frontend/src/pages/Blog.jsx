import { useTheme } from '../ThemeContext';
import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import API_BASE_URL from '../config';

const Blog = () => {
    const { isDark } = useTheme();
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/blogs`)
            .then((res) => res.json())
            .then((data) => setBlogData(data))
            .catch((err) => console.error("Error fetching blogs:", err));
    }, []); 

    console.log(blogData);

    return (
        <div className={`min-h-[88vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {blogData.map((item, index) => (
                    <BlogCard
                        key={index}  // Use index as key
                        mediaType={item.mediaType}
                        mediaSrc={item.media}  // Fix property name
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default Blog;
