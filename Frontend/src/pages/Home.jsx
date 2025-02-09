import React, { useEffect, useState } from 'react'
import { useTheme } from '../ThemeContext';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import { Link } from 'react-router-dom';
import API_BASE_URL from "../config";


function Home() {
  const { isDark } = useTheme();

  const [homeData, setHomedata] = useState({});
    useEffect(() => {
      fetch(`${API_BASE_URL}/api/home`)
          .then((res) => res.json())
          .then((data) => setHomedata(data))
          .catch((err) => console.error("Error fetching education:", err));
  }, []);

  return (
    <div className={`min-h-[88vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 `}>
      {/* Hero Section */}
      <div className="flex flex-col  items-center justify-between md:flex-row p-2 md:px-24 md:py-8 md:pt-36">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4 md:mb-4">{homeData.name}</h1>
          <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-4 md:mt-8`}>
            Working at  <span className={`${isDark ? 'bg-[#2c2e33]' : 'bg-gray-100'} px-2 py-1 rounded`}>{homeData.workPlace}</span>
          </div>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-4 md:mt-8`}>
            {homeData.about}
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8">
          <img
            src={homeData.img}
            alt="Profile"
            className="w-40 h-40 md:h-52 md:w-52 xl:h-60 xl:w-60 rounded-lg object-cover"
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


    </div>
  )
}

export default Home