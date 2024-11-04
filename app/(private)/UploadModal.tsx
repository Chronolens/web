"use client";
import { UploadContext } from "@/providers/uploadModal";
import { useContext } from "react";

export default function UploadModal() {
  const { isUploadModalOpen, closeUploadModal } = useContext(UploadContext);
  if (!isUploadModalOpen) return null;
  return (
    <div
      onClick={closeUploadModal}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col rounded-md w-1/2 h-2/3 bg-black"
      >
        <input
          id="hiddenFileInput"
          type="file"
          accept="image/*"
          className="hidden"
        />

        <div className="flex m-10 rounded-md border-2 border-dashed h-3/4 items-center justify-center">
          <p>Drag & Drop your images here</p>
        </div>

        <div className="flex w-full items-center justify-center">
          <button
            onClick={() => document.getElementById("hiddenFileInput").click()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Browse Files
          </button>
        </div>
      </div>
    </div>
  );
}
