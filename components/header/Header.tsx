"use client";
import { UploadModalContext } from "@/providers/uploadModalProvider";
import uploadIcon from "@/public/static/icons/CloudArrowUp.svg";
import Image from "next/image";
import { useContext, useRef } from "react";
import { HeaderSearchBar } from "./HeaderSearchBar";

export function PrivateHeader() {
  // const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility
  const menuRef = useRef(null); // Reference to the menu element
  const { openUploadModal } = useContext(UploadModalContext);
  //
  // const handleProfileClick = () => {
  //   setMenuOpen((prev) => !prev); // Toggle menu visibility
  // };
  //
  // // Close the menu when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setMenuOpen(false); // Close the menu
  //     }
  //   };
  //
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [menuRef]);

  return (
    <header className="z-40 h-20 flex-none bg-background px-4 py-4 text-foreground">
      <div className="flex flex-row items-center">
        <HeaderSearchBar />

        <div className="ml-auto">
          <div className="flex flex-row items-center space-x-4">
            <button
              onClick={openUploadModal}
              className="flex flex-row items-center justify-center"
            >
              <Image src={uploadIcon} alt="Upload" />
              <p className="pl-1"> Upload </p>
            </button>

            <div className="relative" ref={menuRef}>
              <button className="h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
                <span className="font-bold">P</span>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
