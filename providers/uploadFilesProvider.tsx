"use client";

import { uploadFileAPI } from "@/lib/network/network";
import { createContext, useContext, useState } from "react";
import { humanFileSize } from "@/lib/utils";

const UploadFilesContext = createContext<UploadFilesContextType>();

export enum UploadFileStatus {
  IDLE = "IDLE",
  UPLOADING = "UPLOADING",
  UPLOADED = "UPLOADED",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  ERROR = "ERROR",
}

export interface UploadFilesContextType {
  files: UploadFile[];
  addFiles: (files: [File]) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
  uploadFile: (file: UploadFile) => void;
  retryUpload: (index: number) => void;
  uploadAllFiles: () => void;
}

export class UploadFile {
  file: File;
  url: string;
  name: string;
  size: number;
  sizeString: string;
  status: UploadFileStatus;
  constructor(file: File) {
    this.file = file;
    this.url = URL.createObjectURL(file);
    this.name = file.name;
    this.size = file.size;
    this.sizeString = humanFileSize(file.size, false, 2);
    this.status = UploadFileStatus.IDLE;
    console.log(this);
  }
}

export default function UploadFilesProvider({ children }) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const addFiles = (newFiles: [File]) => {
    const fileArray = Array.from(newFiles).map((file) => new UploadFile(file));
    // if the file is already in the list, don't add it
    const filteredFiles = fileArray.filter(
      (file) =>
        !files.some((f) => f.name === file.name && f.size === file.size) &&
        file.file.type.includes("image"),
    );
    setFiles((prev) => [...prev, ...filteredFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const clearFiles = () => {
    setFiles([]);
  };

  const updateFileProgress = (fileName: string, status: UploadFileStatus) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) => (f.name === fileName ? { ...f, status } : f)),
    );
  };

  const uploadFile = async (fileObj: UploadFile) => {
    const { file, name } = fileObj;
    try {
      console.log("uploading file: ", name);

      updateFileProgress(name, UploadFileStatus.UPLOADING);

      const formData = new FormData();
      formData.append("file", file);
      const response = await uploadFileAPI(formData);
      console.log(response);

      if (response.status === 200) {
        updateFileProgress(name, UploadFileStatus.UPLOADED);
      } else if (response.status === 412) {
        updateFileProgress(name, UploadFileStatus.ALREADY_EXISTS);
      } else {
        updateFileProgress(name, UploadFileStatus.ERROR);
      }
    } catch (error) {
      console.log("error uploading file: ", error);
      updateFileProgress(name, UploadFileStatus.ERROR);
    }
  };

  const retryUpload = (index: number) => {
    uploadFile(files[index]);
  };

  const uploadAllFiles = async () => {
    console.log("uploading all files");
    for (const file of files) {
      if (file.status === UploadFileStatus.IDLE) {
        uploadFile(file);
      }
    }
  };

  const state = {
    files,
    addFiles,
    removeFile,
    clearFiles,
    uploadFile,
    retryUpload,
    uploadAllFiles,
  };
  return (
    <UploadFilesContext.Provider value={state}>
      {children}
    </UploadFilesContext.Provider>
  );
}
export function useUploadFilesContext() {
  return useContext(UploadFilesContext);
}
