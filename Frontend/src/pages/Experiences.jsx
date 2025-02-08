import React from 'react'
import { useTheme } from '../ThemeContext';


function Experiences() {
  const { isDark } = useTheme();
    return (
      <div className={`min-h-[88vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 `}>
  
  
  
  
        <div className='flex justify-end mt-8 mr-2 md:mt-0 md:absolute md:bottom-2 md:right-24'>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-500'} text-xs md:text-sm`}>© {new Date().getFullYear()} Adarsh Roy. All Rights Reserved</p>
        </div>
      </div>
    )
}

export default Experiences