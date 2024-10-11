"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStar, faCog, faInfo, faQuestion } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isSidebarOpen, onSidebarToggle }) => {
  const [isOpen, setIsOpen] = useState(isSidebarOpen);

  useEffect(() => {
    onSidebarToggle(isOpen); // Notify the parent when the sidebar toggles
  }, [isOpen, onSidebarToggle]);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out z-50
        ${isOpen ? 'w-48' : 'w-16'}`}
      onMouseEnter={() => setIsOpen(true)} // Expand when mouse enters
      onMouseLeave={() => setIsOpen(false)} // Collapse when mouse leaves
    >
      <ul className="mt-12 space-y-4">
        <li className="flex items-center space-x-4 pl-4">
          <FontAwesomeIcon icon={faHome} />
          <button className={`transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Home
          </button>
        </li>
        <li className="flex items-center space-x-4 pl-4">
          <FontAwesomeIcon icon={faStar} />
          <button className={`transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Favorites
          </button>
        </li>
        <li className="flex items-center space-x-4 pl-4">
          <FontAwesomeIcon icon={faCog} />
          <button className={`transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Settings
          </button>
        </li>
        <li className="flex items-center space-x-4 pl-4">
          <FontAwesomeIcon icon={faInfo} />
          <button className={`transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Info
          </button>
        </li>
        <li className="flex items-center space-x-4 pl-4">
          <FontAwesomeIcon icon={faQuestion} />
          <button className={`transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Help
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
