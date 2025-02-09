import React from 'react'
import { useTheme } from '../ThemeContext';
import { Link } from 'react-router-dom';


function Error() {
    const { isDark } = useTheme();
  return (
<div className={`flex items-center justify-center min-h-[90vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 `}>

  <div  className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center p-6 max-w-screen-lg mx-auto  rounded-lg`} >
    <div className="mb-6">
      <img src='https://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg' 
           alt="Error Illustration" 
           className="w-52 h-40 mx-auto rounded-md"/>
    </div>
    <h1 className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-2xl font-semibold  mb-4`}>
      Oops! Something Went Wrong
    </h1>
    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}  mb-6`}>
      We couldn't find the page you're looking for. It might have been moved or deleted.
    </p>
    <Link  to={'/'} 
       className={`${isDark ? 'text-white' : 'text-gray-600'} px-6 py-2 bg-[#79bcff] font-medium rounded hover:bg-myblue transition duration-300`}
       >
      Return to Home
    </Link>
  </div>
</div>
  )
}

export default Error