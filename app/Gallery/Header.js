import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';

import { postSearchQuery } from '../../utils/search';

const handleSearchSubmit = async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent the default form submission
    postSearchQuery(searchInput); // Call the search utility function with the query
    setSearchInput(''); // Clear the input field after submission
  }
};

const Header = ({ isSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: searchInput }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Search results:', data);
        // Handle the search results as needed (e.g., update state or display results)

      } catch (error) {
        console.error('Error during search:', error);
      }
      setSearchInput(''); // Clear the input field after submission
    }
  };

  return (
    <header
      className={`sticky top-0 left-0 w-full bg-black text-white py-4 px-8 shadow-md z-40 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'pl-36' : 'pl-12'
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Gallery</h1>

        {/* Search Bar */}
        <div className="relative w-1/3">
          <div className="flex items-center border border-gray-300 rounded-full bg-gray-200">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-gray-400 mx-2" // Added horizontal margin for spacing
            />
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchSubmit} // Handle keydown for "Enter"
              className="pl-2 py-2 w-full rounded-full bg-gray-200 text-black border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <FontAwesomeIcon icon={faUpload} className="text-gray-600" />
          </button>

          {/* Profile Button */}
          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white"
              onClick={toggleDropdown}
            >
              {/* Profile Icon Placeholder */}
              <span className="font-bold">P</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
              >
                <div className="flex justify-between items-center p-2">
                  <h3 className="text-gray-800">Menu</h3>
                  <button onClick={closeDropdown} className="text-gray-600">
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <ul className="py-1">
                  <li className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer" onClick={closeDropdown}>Profile</li>
                  <li className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer" onClick={closeDropdown}>Settings</li>
                  <li className="block px-4 py-2 text-white bg-red-500 hover:bg-red-600 cursor-pointer" onClick={closeDropdown}>Log Out</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
