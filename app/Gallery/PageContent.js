const PageContent = ({ isSidebarOpen }) => {
    return (
      <main
        className={`flex-1 p-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'pl-36' : 'pl-12'
        }`}
      >
        <h2 className="text-2xl font-semibold">Main Content Area</h2>
        <p className="mt-4">This is where the content of the page will be displayed. You can add images, text, and other elements here.</p>
      </main>
    );
  };
  
  export default PageContent;
  