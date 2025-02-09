import React from 'react'
import { useTheme } from '../ThemeContext';


function Footer() {
  const { isDark } = useTheme();
    return (
    <div className='h-full flex  items-end justify-end mt-8 mr-2 md:mt-0 md:absolute md:bottom-2 md:right-24'>
    <p  className={`${isDark ? 'text-gray-300' : 'text-gray-500'} text-xs md:text-sm`}>© {new Date().getFullYear()} Adarsh Roy. All Rights Reserved</p>
    </div>
  )
}

export default Footer