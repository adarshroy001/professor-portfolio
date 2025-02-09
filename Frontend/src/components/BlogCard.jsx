import React from "react";

const BlogCard = ({ mediaType, mediaSrc, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-md">
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
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
