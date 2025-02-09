import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

import { IoHomeOutline ,IoBriefcaseOutline ,IoDocumentOutline ,IoTrophyOutline ,IoNewspaperOutline ,IoSunnyOutline ,IoMoonOutline ,IoMenuOutline ,IoCloseOutline} from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { MdOutlineDashboard } from "react-icons/md";

const navigation = [
  { name: 'Dashboard', href: '/', icon: MdOutlineDashboard },
  { name: 'Home', href: '/Home', icon: IoHomeOutline },
  { name: 'Education', href: '/education', icon: HiOutlineAcademicCap },
  { name: 'Experience', href: '/experience', icon: IoBriefcaseOutline },
  { name: 'Research Papers', href: '/research-papers', icon: IoDocumentOutline },
  { name: 'Achievements', href: '/achievements', icon: IoTrophyOutline },
  { name: 'Blogs', href: '/blogs', icon: IoNewspaperOutline },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  console.log(darkMode);
  
  const location = useLocation();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between h-16 px-4">
              <span className="text-xl font-semibold dark:text-white">Admin Panel</span>
              <button onClick={() => setSidebarOpen(false)}>
                <IoCloseOutline className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.href
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between flex-shrink-0 px-4">
                <span className="text-xl font-semibold dark:text-white">Admin Panel</span>
              </div>
              <nav className="flex-1 px-2 mt-5 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.href
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top header */}
          <div className="flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <button
              className="px-4 text-gray-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <IoMenuOutline className="w-6 h-6" />
            </button>

            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
              >
                {darkMode ? (
                  <IoSunnyOutline className="w-6 h-6" />
                ) : (
                  <IoMoonOutline className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
            <div className="py-6">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;