"use client";

import { createContext, useState } from "react";

export const UploadContext = createContext({});

export default function UploadProvider({ children }) {
  const [isUploadModalOpen, setIsModalOpen] = useState(false);
  const openUploadModal = () => setIsModalOpen(true);
  const closeUploadModal = () => setIsModalOpen(false);
  const state = {
    isUploadModalOpen,
    openUploadModal,
    closeUploadModal,
  };
  return (
    <UploadContext.Provider value={state}>{children}</UploadContext.Provider>
  );
}
