"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import uploadIcon from "@/public/static/icons/CloudArrowUp.svg";
import Image from "next/image";
import { UploadModalContext } from "@/providers/uploadModalProvider";
import { HeaderSearchBar } from "./HeaderSearchBar";

export function PrivateHeader() {
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility
  const menuRef = useRef(null); // Reference to the menu element
  const { openUploadModal } = useContext(UploadModalContext);

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
    <header className="flex-none h-20 bg-background text-foreground px-4 py-4 z-40">
      <div className="flex flex-row items-center">
        <HeaderSearchBar />

        {/* Right Buttons */}
        <div className="ml-auto">
          <div className="flex flex-row items-center space-x-4">
            <button
              onClick={openUploadModal}
              className="flex flex-row items-center justify-center"
            >
              <Image src={uploadIcon} alt="Upload" />
              <p className="pl-1"> Upload </p>
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
