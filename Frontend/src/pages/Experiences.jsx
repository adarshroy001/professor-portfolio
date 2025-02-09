import React from 'react'
import { useTheme } from '../ThemeContext';


function Experiences() {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-[88vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 flex items-center justify-center `}>
      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}  w-[80%] md:w-[60%]`}>
        We are currently working on  <span className={`${isDark ? 'bg-[#2c2e33]' : 'bg-gray-100'} px-2 py-1 rounded`}>Achievements Page </span>  and
        <span className={`${isDark ? 'bg-[#2c2e33]' : 'bg-gray-100'} px-2 py-1 rounded`}> Experiences page  </span>
           please Visit other Page For now
      </p>
    </div>
  )
}

export default Experiences