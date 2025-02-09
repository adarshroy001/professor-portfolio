import React from "react";
import { useTheme } from '../ThemeContext';

const BlogCard = ({ mediaType, mediaSrc, title, description }) => {
        const { isDark } = useTheme();
  return (
<div className={`rounded-lg overflow-hidden max-w-md 
    ${isDark ? 'bg-[#2c2e33] border border-[#ade9c3]' : 'bg-gray-100 border border-[#85feb1]'}`}>
      {/* Media (Image/Video) */}
      <div className="w-full h-52">
        {mediaType === "video" ? (
          <video controls className="w-full h-full object-cover">
            <source src={mediaSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={mediaSrc} alt="Blog Media" className="w-full h-full object-cover" />
        )}
      </div>

      {/* Blog Details */}
      <div className="p-4">
        <h2 className={`${isDark ? 'text-white ' : ' text-gray-700'} text-lg font-semibold `}>{title}</h2>
        <p className={`${isDark ? 'text-white ' : ' text-gray-700'} text-sm  `}>{description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
