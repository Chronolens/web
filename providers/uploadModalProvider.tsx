"use client";

import { createContext, useContext, useState } from "react";

const UploadModalContext = createContext<UploadModalContextType>();

export interface UploadModalContextType {
  isUploadModalOpen: boolean;
  openUploadModal: () => void;
  closeUploadModal: () => void;
}
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
    <UploadModalContext.Provider value={state}>
      {children}
    </UploadModalContext.Provider>
  );
}

export function useUploadModalContext() {
  return useContext(UploadModalContext);
}
