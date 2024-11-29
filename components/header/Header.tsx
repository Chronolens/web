"use client";
import { useUploadModalContext } from "@/providers/uploadModalProvider";
import uploadIcon from "@/public/static/icons/CloudArrowUp.svg";
import userAvatar from "@/public/static/images/user-avatar.png";
import Image from "next/image";
import { HeaderSearchBar } from "./HeaderSearchBar";

export function PrivateHeader() {
  const { openUploadModal } = useUploadModalContext();

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

            <Image className="rounded-full" src={userAvatar} height={40} width={40} alt="user" />
          </div>
        </div>
      </div>
    </header>
  );
}
