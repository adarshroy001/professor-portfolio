import React from 'react'
import { useTheme } from '../ThemeContext';


function Experiences() {
  const { isDark } = useTheme();
    return (
      <div className={`min-h-[88vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 `}>
  
  
  
  
        
      </div>
    )
}

export default Experiences