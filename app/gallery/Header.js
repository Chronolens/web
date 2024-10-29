"use client";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUpload } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility
  const menuRef = useRef(null); // Reference to the menu element

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission
      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: searchInput }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Search results:", data);
        // Handle the search results as needed (e.g., update state or display results)
      } catch (error) {
        console.error("Error during search:", error);
      }
      setSearchInput(""); // Clear the input field after submission
    }
  };

  const handleProfileClick = () => {
    setMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="sticky top-0 left-0 w-full bg-black text-white py-4 px-8 shadow-md z-40">
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
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleProfileClick}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white"
            >
              <span className="font-bold">P</span>{" "}
              {/* Profile Icon Placeholder */}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <ul className="py-1">
                  <li className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                    Profile
                  </li>
                  <li className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                    Settings
                  </li>
                  <li className="block px-4 py-2 text-white bg-red-500 hover:bg-red-600 cursor-pointer">
                    Log Out
                  </li>
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
