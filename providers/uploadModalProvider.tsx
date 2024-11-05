"use client";

import { createContext, useState } from "react";

export const UploadModalContext = createContext({});

export default function UploadModalProvider({ children }) {
  const [isUploadModalOpen, setIsModalOpen] = useState(false);
  const openUploadModal = () => setIsModalOpen(true);
  const closeUploadModal = () => setIsModalOpen(false);
  const state = {
    isUploadModalOpen,
    openUploadModal,
    closeUploadModal,
  };
  return (
    <UploadModalContext.Provider value={state}>{children}</UploadModalContext.Provider>
  );
}
