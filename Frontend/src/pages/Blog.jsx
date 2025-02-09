import { useTheme } from '../ThemeContext';
import React from "react";
import BlogCard from "../components/BlogCard";

const blogData = [
  {
    id: 1,
    mediaType: "image",
    mediaSrc: "https://images.tech.co/wp-content/uploads/2024/01/15074809/AdobeStock_640654498-1.jpeg", // Replace with actual image URL
    title: "Exciting Research in AI",
    description: "A brief overview of the latest advancements in artificial intelligence.",
  },
  {
    id: 2,
    mediaType: "video",
    mediaSrc: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with actual video URL
    title: "AI and Robotics",
    description: "Exploring the intersection of artificial intelligence and robotics.",
  },
];

const Blog = () => {
    const { isDark } = useTheme();
  return (
    <div className={`min-h-[88vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 `}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 " >
        {blogData.map((blog) => (
          <BlogCard
            key={blog.id}
            mediaType={blog.mediaType}
            mediaSrc={blog.mediaSrc}
            title={blog.title}
            description={blog.description}
          />
        ))}
      </div>
    </div>

  );
};


export default Blog