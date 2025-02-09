import React from 'react'
import { useTheme } from '../ThemeContext';


function Footer() {
  const { isDark } = useTheme();
  return (
    <div className={` ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200  `}>
      <div className='h-full flex  items-end justify-end  pr-2 pb-2'>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-500'} text-xs md:text-sm`}>© {new Date().getFullYear()} Adarsh Roy. All Rights Reserved</p>
      </div>
    </div>
  )
}
export default Footer