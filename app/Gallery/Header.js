const Header = ({ isSidebarOpen }) => {
    return (
      <header
        className={`sticky top-0 left-0 w-full bg-blue-600 text-white py-4 px-8 shadow-md z-40 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'pl-36' : 'pl-12'
        }`}
      >
        <h1 className="text-xl font-bold">Gallery Page</h1>
      </header>
    );
  };
  
  export default Header;
  