"use client";
import searchIcon from "@/public/static/icons/MagnifyingGlass.svg";
import Image from "next/image";
import { useState } from "react";

export function HeaderSearchBar() {
  const [searchInput, setSearchInput] = useState("");
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
  return (
    <div className="pl-3 flex-1 w-14">
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchSubmit} // Handle keydown for "Enter"
          className="transition duration-500 bg-background pl-9 py-2 border-0 border-b border-gray-500 text-foreground focus:ring-0 focus:border-foreground focus:ease-in-out"
          placeholder="Search..."
        />
        <div className="absolute inset-y-0 left-0 pl-1 flex items-center text-gray-400">
          <Image src={searchIcon} alt="Search Icon" />
        </div>
      </div>
    </div>
  );
}
