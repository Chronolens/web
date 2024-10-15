"use client";

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PageContent from './PageContent';

export default function GalleryPage() {

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Static Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-60"> 
        {/* Sidebar width is now static, so no need for dynamic margin adjustments */}

        {/* Header */}
        <Header />

        {/* Page Content */}
        <PageContent />
      </div>
    </div>
  );

  //stowaway
  /*const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="flex h-screen overflow-hisdden">
      <Sidebar isSidebarOpen={isSidebarOpen} onSidebarToggle={handleSidebarToggle} />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-36' : 'ml-12'
        }`}
      >
        <Header isSidebarOpen={isSidebarOpen} />

        <PageContent isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );*/
}
