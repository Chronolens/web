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
    <div className="w-14 flex-1 pl-3">
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchSubmit} // Handle keydown for "Enter"
          className="border-0 border-b border-gray-500 bg-background py-2 pl-9 text-foreground transition duration-500 focus:border-foreground focus:ring-0 focus:ease-in-out"
          placeholder="Search..."
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-1 text-gray-400">
          <Image src={searchIcon} alt="Search Icon" />
        </div>
      </div>
    </div>
  );
}
