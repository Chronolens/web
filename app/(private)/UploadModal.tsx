"use client";
import {
  UploadFile,
  useUploadFilesContext,
} from "@/providers/uploadFilesProvider";
import { UploadModalContext } from "@/providers/uploadModalProvider";
import Image from "next/image";
import removeItemIcon from "@/public/static/icons/X.svg";
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
        className="flex flex-col rounded-lg w-[780px] h-[880px] bg-gradient-metadata justify-center"
      >
        <div className="flex flex-none items-center h-20">
          <h2 className="ml-8 text-lg">Selected Files</h2>
          <button onClick={triggerFileInput} className="ml-auto mr-8 bg-foreground text-background rounded-lg px-6 py-2">
            Add More
          </button>
        </div>
        <input
          id="hiddenFileInput"
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleChange}
        />

        <DragAndDrop />

        <div className="flex mt-4 mb-4 w-full items-center justify-center">
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
      className="flex-1 ml-10 overflow-scroll"
    >
      {files.length != 0 ? (
          <table className="w-full table-fixed">
            <tbody>
              {files.map((file, index) => (
                <UploadFileListItem key={index} index={index} file={file} />
              ))}
            </tbody>
          </table>
      ) : (
        <div className="flex w-full items-center justify-center rounded-lg border-2">
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
    <tr>
      <td>
        <Image src={file.url} alt="" width={64} height={64} />
      </td>
      <td className="px-6 py-4 w-80 truncate">{file.name}</td>
      <td className="px-6 py-4">{file.size}</td>
      <td className="px-6 py-4">{file.status}</td>
      <td className="pl-6 py-4">
        <button onClick={() => removeFile(index)}>
          <Image src={removeItemIcon} alt="Remove Icon" />
        </button>
      </td>
    </tr>
  );
}

function UploadButton() {
  const { files, uploadAllFiles } = useUploadFilesContext();
  const className = "w-80 bg-foreground text-background px-4 py-2 rounded-lg";
  if (files.length != 0) {
    return (
      <button className={className} onClick={uploadAllFiles}>
        Upload All Files
      </button>
    );
  } else {
    return (
      <button
        className={className}
        onClick={() => document.getElementById("hiddenFileInput").click()}
      >
        Browse Files
      </button>
    );
  }
}
