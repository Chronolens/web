"use client";
import {
  UploadFile,
  UploadFileStatus,
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
  return (
    <div onDrop={handleDrop} className="flex-1">
      {files.length != 0 ? (
        <div>
          <div className="flex items-center h-20">
            <h2 className="ml-8 text-lg">Selected Files</h2>
            <button
              onClick={triggerFileInput}
              className="ml-auto mr-8 bg-foreground text-background rounded-lg px-6 py-2"
            >
              Add More
            </button>
          </div>
          <div className="h-[700px] overflow-scroll">
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="w-1/6 pb-4">Preview</th>
                  <th className="w-2/6 pb-4">Name</th>
                  <th className="w-1/6 pb-4">Size</th>
                  <th className="w-1/6 pb-4">Status</th>
                  <th className="w-1/6 pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <UploadFileListItem key={index} index={index} file={file} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="h-full px-10 pt-10">
          <div className="flex h-full items-center justify-center rounded-lg border-2">
            <span>Drag & Drop your media here</span>
          </div>
        </div>
      )}
    </div>
  );
}

function FileStatus({ status }: { status: UploadFileStatus }) {
  switch (status) {
    case UploadFileStatus.IDLE:
      return <span className="text-yellow-light"> Not Uploaded </span>;
    case UploadFileStatus.UPLOADING:
      return <span className="text-blue-light"> Uploading... </span>;
    case UploadFileStatus.UPLOADED:
      return <span className="text-green-light"> Uploaded </span>;
    case UploadFileStatus.ERROR:
      return <span className="text-red-light"> Failed to Upload </span>;
    default:
      return <span className="text-red-light"> Status not supported </span>;
  }
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
        <div className="flex justify-center items-center">
          <Image src={file.url} alt="" width={64} height={64} />
        </div>
      </td>
      <td>{file.name}</td>
      <td>
        <div className="flex justify-center items-center">
          <span>{file.size}</span>
        </div>
      </td>
      <td>
        <div className="flex justify-center items-center">
          <FileStatus status={file.status} />
        </div>
      </td>
      <td>
        <div className="flex justify-center items-center">
          <button onClick={() => removeFile(index)}>
            <Image src={removeItemIcon} alt="Remove Icon" />
          </button>
        </div>
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
