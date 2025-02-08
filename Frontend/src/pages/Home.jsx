import React, { useState } from 'react'
import { useTheme } from '../ThemeContext';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import { Link } from 'react-router-dom';


function Home() {
  const { isDark } = useTheme();
  const [name, setName] = useState('Adarsh Roy')
  const [about, setAbout] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, harum vel! Voluptatibus, laudantium. Quibusdam iusto possimus facilis minima omnis magni expedita ad excepturi, doloremque ab eum dicta nostrum eos molestias reprehenderit minus quos consequatur voluptatibus, debitis deleniti rerum optio est! Nostrum facilis ducimus dolore officiis perferendis accusamus, blanditiis dolores aut!')
  const workPlace = 'NIT Jamshedpur'
  const img = 'https://avatars.githubusercontent.com/u/12345678?v=4'

  return (
    <div className={`min-h-[88vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 `}>
      {/* Hero Section */}
      <div className="flex flex-col  items-center justify-between md:flex-row p-2 md:px-24 md:py-8 md:pt-36">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4">{name}</h1>
          <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Working at  <span className={`${isDark ? 'bg-[#2c2e33]' : 'bg-gray-100'} px-2 py-1 rounded`}>{workPlace}</span>
          </div>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            {about}
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8">
          <img
            src={img}
            alt="Profile"
            className="w-40 h-40 md:h-52 md:w-52 rounded-lg"
          />
        </div>
      </div>

      {/* Bottom Section */}

        <div  className='p-2 md:px-24'>
          <h2 className="text-4xl font-bold ">Contact </h2>
          <div className="flex gap-8 flex-wrap mt-6">
            <Link to={'/'} className='text-2xl '><SiGooglescholar /></Link>
            <Link to={'/'} className='text-2xl'><FaLinkedin /></Link>
            <Link to={'/'} className='text-2xl'><FaTwitter /></Link>
            <Link to={'/'} className='text-2xl'><FaFacebook /></Link>
            <Link to={'/'} className='text-2xl'><FaInstagram /></Link>
          </div>
        </div>
        <div className='flex justify-end mt-8 mr-2 md:mt-0 md:absolute md:bottom-2 md:right-24'>
        <p  className={`${isDark ? 'text-gray-300' : 'text-gray-500'} text-xs md:text-sm`}>© {new Date().getFullYear()} Adarsh Roy. All Rights Reserved</p>
        </div>





    </div>
  )
}

export default Home