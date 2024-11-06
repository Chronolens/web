"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUpload } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { UploadModalContext } from "@/providers/uploadModalProvider";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility
  const menuRef = useRef(null); // Reference to the menu element
  const { openUploadModal } = useContext(UploadModalContext);

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
    <header className="h-20 bg-background text-foreground px-4 py-4 z-40">
      <div className="flex flex-row items-center">
        {/* Search Bar */}
        <div className="pl-9 flex-1 w-14">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchSubmit} // Handle keydown for "Enter"
              className="transition duration-500 bg-background pl-9 py-2 border-0 border-b border-gray-500 text-foreground focus:ring-0 focus:border-foreground focus:ease-in-out"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-400"
              />
            </div>
          </div>
        </div>
        {/* Right Buttons */}
        <div className="flex-end">
          <div className="flex flex-row items-center space-x-4">
            <button onClick={openUploadModal} className="p-2 bg-gray-200 hover:bg-gray-300">
              <FontAwesomeIcon icon={faUpload} className="text-gray-600" />
            </button>

            {/* Profile Button */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={handleProfileClick}
                className="items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white"
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
      </div>
    </header>
  );
};

export default Header;
