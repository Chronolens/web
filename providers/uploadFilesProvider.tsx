"use client";

import { createContext, useState } from "react";

export const UploadFilesContext = createContext({});

enum UploadFileStatus {
  IDLE = "IDLE",
  UPLOADING = "UPLOADING",
  UPLOADED = "UPLOADED",
  ERROR = "ERROR",
}

class UploadFile {
  file: File;
  url: string;
  name: string;
  size: number;
  status: UploadFileStatus;
  constructor(
    file: File,
  ) {
    this.file = file;
    this.url = URL.createObjectURL(file);
    this.name = file.name;
    this.size = file.size;
    this.status = UploadFileStatus.IDLE;
    console.log(this)
  }
}

export default function UploadFilesProvider({ children }) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const addFiles = (newFiles: [File]) => {
    const fileArray = Array.from(newFiles).map(
      (file) =>
        new UploadFile(file),
    );
    console.log(files)
    setFiles((prev) => [...prev, ...fileArray]);
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
      updateFileProgress(name, UploadFileStatus.UPLOADING);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("", { body: formData });

      if (response.status === 200) {
        updateFileProgress(name, UploadFileStatus.UPLOADED);
      } else {
        updateFileProgress(name, UploadFileStatus.ERROR);
      }
    } catch (error) {
      updateFileProgress(name, UploadFileStatus.ERROR);
    }
  };
  const uploadAllFiles = async () => {
    for (const file of files) {
      uploadFile(file);
    }
  }

  const state = {
    files,
    addFiles,
    removeFile,
    clearFiles,
    uploadFile,
    uploadAllFiles,
  };
  return (
    <UploadFilesContext.Provider value={state}>
      {children}
    </UploadFilesContext.Provider>
  );
}
