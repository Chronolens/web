"use client";

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

        <Header />

        <PageContent />
      </div>
    </div>
  );
}
