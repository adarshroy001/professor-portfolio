import React from 'react'

function Achievements() {
  const isDark = 'dark';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white w-full">
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}  w-[80%] md:w-[80%]`}>
          We are currently working on  <span className={`${isDark ? 'bg-[#2c2e33]' : 'bg-gray-100'} px-2 py-1 rounded`}>Achievements Page </span>  and
          <span className={`${isDark ? 'bg-[#2c2e33]' : 'bg-gray-100'} px-2 py-1 rounded`}> Experiences page  </span>
          please Visit other Page For now
        </p>
        </h1>
      </div>
    </div>
  );
}

export default Achievements