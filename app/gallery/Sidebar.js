import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faFolderOpen,
  faShareAlt,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
// import Calendar from "./Calendar"; // Import the Calendar component

const Sidebar = () => {
  return (
    <aside className="h-screen w-60 bg-gray-800 text-white z-50">
      <nav>
        <ul className="mt-12 space-y-4">
          <li className="flex items-center space-x-4 pl-4 hover:bg-gray-600 transition-colors duration-300">
            <FontAwesomeIcon icon={faImages} />
            <button>Gallery</button>
          </li>
          <li className="flex items-center space-x-4 pl-4 hover:bg-gray-600 transition-colors duration-300">
            <FontAwesomeIcon icon={faFolderOpen} />
            <button>Folders</button>
          </li>
          <li className="flex items-center space-x-4 pl-4 hover:bg-gray-600 transition-colors duration-300">
            <FontAwesomeIcon icon={faShareAlt} />
            <button>Shared</button>
          </li>
          <li className="flex items-center space-x-4 pl-4 hover:bg-gray-600 transition-colors duration-300">
            <FontAwesomeIcon icon={faClock} />
            <button>Timeline</button>
          </li>
          <li className="flex items-center space-x-4 pl-4 hover:bg-gray-600 transition-colors duration-300">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <button>Map</button>
          </li>
        </ul>

        {/* Calendar Component */}
        {/*
      <div className="mt-8 px-4">
        <Calendar />
      </div>
      */}
      </nav>
    </aside>
  );
};

export default Sidebar;
