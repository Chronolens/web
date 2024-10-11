"use client";

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PageContent from './PageContent';

export default function GalleryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} onSidebarToggle={handleSidebarToggle} />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-36' : 'ml-12'
        }`}
      >
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} />

        {/* Page Content */}
        <PageContent isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
}
