import React from 'react'
import { useTheme } from '../ThemeContext';


function EducationCard({ eduDetail }) {
    const { isDark } = useTheme();


    return (

        <div className="w-full overflow-hidden m-auto pt-6 sm:pt-8 pb-6 sm:pb-8 ">
            <div className="Title w-[85%] border-b sm:w-[90%] lg:w-[80vw] mx-auto relative">
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg sm:text-2xl font-semibold mx-3`}>
                  { eduDetail.DegreeName}
                </p>
            </div>
            <div className="Bottom-half w-[90%] lg:w-[80vw] mx-auto mt-4 grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2">
                <div className="image w-full mt-0 sm:mt-4">
                    <div className=' rounded-xl !ml-4 sm:!ml-8 w-[85%] sm:w-[90%] xl:w-[75%] !h-[100%]'>
                        <img src={eduDetail.collegeImg} alt="" className='rounded-xl object-cover w-full h-full p-1' />
                    </div>
                </div>

                <div className="text-part ml-5 w-full">
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base mt-3 mb-0 sm:mb-3 w-4/5`}>
                    { eduDetail.CollegeName}
                    </p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base mt-3  mb-0 sm:mb-3 w-4/5`}>
                    { eduDetail.Department}
                    </p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base mt-3  mb-0 sm:mb-3 w-4/5`}>
                    { eduDetail.Title}
                    </p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base mt-3  mb-0 sm:mb-3 w-4/5`}>
                        <span className='text-base font-bold'>Supervisor:  </span>   { eduDetail.Supervisor}
                    </p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base mt-3  mb-0 sm:mb-3 w-4/5`}>
                        <span className='text-base font-bold'>Year:  </span>   { eduDetail.year}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EducationCard