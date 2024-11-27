"use client";
import searchIcon from "@/public/static/icons/MagnifyingGlass.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeaderSearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchSubmit = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchInput === "") return;
      router.push("/search/" + searchInput);
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
          className="border-0 border-b border-gray-info bg-background py-2 pl-9 text-foreground transition duration-500 focus:border-foreground focus:ring-0 focus:ease-in-out"
          placeholder="Search..."
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-1 text-gray-info">
          <Image src={searchIcon} alt="Search Icon" />
        </div>
      </div>
    </div>
  );
}
