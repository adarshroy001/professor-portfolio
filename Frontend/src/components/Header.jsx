import React, { useState } from 'react';
import { FiSun, FiMoon, FiMenu, FiSearch } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark, setIsDark } = useTheme();
  return (
    <div className={`min-w-screen min-h-[12vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 border-b border-b-[#adffcb]  `}>
      <header className="container mx-auto px-4 py-6 xl:px-24 ">
        <nav className="flex items-center justify-between  flex-wrap-reverse">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to={'/'} className="text-[#00b341] hover:text-[#00d64f] transition-colors">Home</NavLink>
            <NavLink to={'/'} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Educations</NavLink>
            <NavLink to={'/'} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Experiences</NavLink>
            <NavLink to={'/'} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Research-Paper</NavLink>
            <NavLink to={'/'} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Achievements</NavLink>
            <NavLink to={'/'} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Blog</NavLink>
          </div>

          {/* themeChange button and searchbar  */}
          <div className="flex items-center gap-4 ">
            <button
              className={`p-2 rounded-full border ${isDark
                ? 'border-[#2c2e33] hover:bg-[#2c2e33]'
                : 'border-gray-200 hover:bg-gray-100'
                } transition-colors`}
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? (
                <FiSun className="w-5 h-5 text-[#00b341]" />
              ) : (
                <FiMoon className="w-5 h-5 text-[#00b341]" />
              )}
            </button>
            {/* Search Bar */}
            <div className={`hidden md:flex items-center ${isDark ? 'bg-[#2c2e33]' : 'bg-gray-100'
              } rounded-lg px-3 py-2`}>
              <FiSearch className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`ml-2 bg-transparent outline-none ${isDark ? 'placeholder-gray-500' : 'placeholder-gray-400'
                  } w-64`}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg ${isDark
              ? 'bg-[#2c2e33] hover:bg-[#3c3e43]'
              : 'bg-gray-100 hover:bg-gray-200'
              } transition-colors`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 ">
            {/* Mobile Search Bar */}
            <div className={`mb-4 flex items-center ${isDark ? 'bg-[#2c2e33]' : 'bg-gray-100'
              } rounded-lg px-3 py-2`}>
              <FiSearch className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`ml-2 bg-transparent outline-none ${isDark ? 'placeholder-gray-500' : 'placeholder-gray-400'
                  } w-full`}
              />
            </div>

            <div className={`${isDark ? 'bg-[#2c2e33]' : 'bg-gray-100'
              } rounded-lg p-4`}>
              <div className="flex flex-col gap-4">
                <NavLink to={'/'} className="text-[#00b341] hover:text-[#00d64f] transition-colors">Home</NavLink>
                <NavLink to={'/'} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Educations</NavLink>
                <NavLink to={'/'} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Experiences</NavLink>
                <NavLink to={'/'} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Research-Paper</NavLink>
                <NavLink to={'/'} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Achievements</NavLink>
                <NavLink to={'/'} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Blog</NavLink>
              </div>
            </div>
          </div>
        )}


      </header>
    </div>
  );
};

export default Header;
