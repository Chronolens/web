"use client";
import {
  UploadFile,
  UploadFilesContext,
  useUploadFilesContext,
} from "@/providers/uploadFilesProvider";
import { UploadModalContext } from "@/providers/uploadModalProvider";
import Image from "next/image";
import { useContext, useState } from "react";

export default function UploadModal() {
  const { isUploadModalOpen, closeUploadModal } =
    useContext(UploadModalContext);
  const { addFiles } = useUploadFilesContext();
  const handleChange = (e) => {
    const files = e.target.files;
    console.log(files);
    if (!files.length) return;
    addFiles(files);
  };
  if (!isUploadModalOpen) return null;
  return (
    <div
      onClick={closeUploadModal}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col rounded-md w-3/5 h-2/3 bg-black justify-center"
      >
        <input
          id="hiddenFileInput"
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleChange}
        />

        <DragAndDrop />

        <div className="flex flex-none w-full items-center justify-center">
          <UploadButton />
        </div>
      </div>
    </div>
  );
}

const triggerFileInput = () => {
  document.getElementById("hiddenFileInput").click();
};

function DragAndDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const { files, addFiles } = useUploadFilesContext();
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    // TODO: add a mime type check
    if (files.length) {
      addFiles(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className="flex h-3/4"
    >
      {files.length != 0 ? (
        <div className="flex flex-col w-full space-y-2 overflow-auto">
          <div className="mx-10">
            {files.map((file, index) => (
              <UploadFileListItem index={index} file={file} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex mx-10 w-full items-center justify-center rounded-md border-2">
          <p>Drag & Drop your images here</p>
        </div>
      )}
    </div>
  );
}

function UploadFileListItem({
  index,
  file,
}: {
  index: number;
  file: UploadFile;
}) {
  const { removeFile } = useUploadFilesContext();
  return (
    <div
      index={index}
      className="h-20 w-full flex flex-row overflow-clip items-center justify-between"
    >
      <Image src={file.url} alt="" width={64} height={64} />
      <p>{file.name}</p>
      <p>{file.size}</p>
      <p>{file.status}</p>
      <button onClick={() => removeFile(index)}>X</button>
    </div>
  );
}

function UploadButton() {
  const { files, uploadAllFiles } = useUploadFilesContext();
  if (files.length != 0) {
    return (
      <button
        className="bg-foreground text-background px-4 py-2 rounded-md"
        onClick={uploadAllFiles}
      >
        Upload All Files
      </button>
    );
  } else {
    return (
      <button
        onClick={() => document.getElementById("hiddenFileInput").click()}
        className="bg-foreground text-background px-4 py-2 rounded-md"
      >
        Browse Files
      </button>
    );
  }
}
