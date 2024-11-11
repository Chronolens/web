"use client";
import { UploadModalContext } from "@/providers/uploadModalProvider";
import uploadIcon from "@/public/static/icons/CloudArrowUp.svg";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { HeaderSearchBar } from "./HeaderSearchBar";
import { signOut } from "next-auth/react";

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
    <header className="z-40 h-20 flex-none bg-background px-4 py-4 text-foreground">
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
                className="h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white"
              >
                <span className="font-bold">P</span>{" "}
                {/* Profile Icon Placeholder */}
              </button>
              {menuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg">
                  <ul className="py-1">
                    <li className="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-200">
                      Profile
                    </li>
                    <li className="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-200">
                      Settings
                    </li>
                    <li className="block cursor-pointer bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                      <button className="w-full" onClick={() => signOut()}>
                        Log Out
                      </button>
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
}
