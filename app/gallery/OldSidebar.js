"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faFolderOpen, faShareAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar'; // Import the Calendar component

const Sidebar = ({ isSidebarOpen, onSidebarToggle }) => {
  const [isOpen, setIsOpen] = useState(isSidebarOpen);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    onSidebarToggle(isOpen); // Notify the parent when the sidebar toggles
  }, [isOpen, onSidebarToggle]);

  const handleDateRangeChange = (range) => {
    setSelectedRange(range);
    console.log("Selected date range:", range); // Optional: log or use the date range elsewhere
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out z-50
        ${isOpen ? 'w-60' : 'w-16'}`} 
      onMouseEnter={() => setIsOpen(true)} // Expand when mouse enters
      onMouseLeave={() => setIsOpen(false)} // Collapse when mouse leaves
    >
      <ul className="mt-12 space-y-4">
        <li
          className={`flex items-center space-x-4 pl-4 transition-colors duration-300 
                      ${isOpen ? 'bg-transparent hover:bg-gray-600' : 'bg-transparent'}`}
        >
          <FontAwesomeIcon icon={faImages} />
          <button className={`transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Gallery
          </button>
        </li>
        <li
          className={`flex items-center space-x-4 pl-4 transition-colors duration-300 
                      ${isOpen ? 'bg-transparent hover:bg-gray-600' : 'bg-transparent'}`}
        >
          <FontAwesomeIcon icon={faFolderOpen} />
          <button className={`transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Folders
          </button>
        </li>
        <li
          className={`flex items-center space-x-4 pl-4 transition-colors duration-300 
                      ${isOpen ? 'bg-transparent hover:bg-gray-600' : 'bg-transparent'}`}
        >
          <FontAwesomeIcon icon={faShareAlt} />
          <button className={`transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Shared
          </button>
        </li>
        <li
          className={`flex items-center space-x-4 pl-4 transition-colors duration-300 
                      ${isOpen ? 'bg-transparent hover:bg-gray-600' : 'bg-transparent'}`}
        >
          <FontAwesomeIcon icon={faClock} />
          <button className={`transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Timeline
          </button>
        </li>
        <li
          className={`flex items-center space-x-4 pl-4 transition-colors duration-300 
                      ${isOpen ? 'bg-transparent hover:bg-gray-600' : 'bg-transparent'}`}
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <button className={`transition-opacity duration-300 ${!isOpen ? 'opacity-0' : 'opacity-100'}`}>
            Map
          </button>
        </li>
      </ul>

      {/* Calendar Component */}
      {isOpen && (
        <div className="mt-8 px-4">
          <Calendar onDateRangeChange={handleDateRangeChange} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
