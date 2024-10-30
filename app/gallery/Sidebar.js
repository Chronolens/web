import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faFolderOpen,
  faShareAlt,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
// import Calendar from "./Calendar"; // Import the Calendar component

export function SidebarItem() {
    return (
          <li className="flex py-3 items-center space-x-4 pl-4 hover:bg-gray-600 transition-colors duration-300">
            <FontAwesomeIcon icon={faImages} />
            <button>Gallery</button>
          </li>
    );
}

export function SidebarItemList() {
    return (
        <ul>
          {sidebarItems.map((item, index) => ())}
        </ul>
    );
}

struct SidebarItem {

const sidebarItems = [
  {"icon": faImages, "text": "Gallery", link: "/gallery"},
  {"icon": faFolderOpen, "text": "Folders", link: "/folders"},
  {"icon": faShareAlt, "text": "Shared", link: "/shared"},
  {"icon": faClock, "text": "Timeline", link: "/timeline"},
  {"icon": faMapMarkerAlt, "text": "Map", link: "/map"},
]

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-background text-foreground overflow-clip">
      <nav>
        <ul >
          <li className="flex py-3 items-center space-x-4 pl-4 hover:bg-gray-600 transition-colors duration-300">
            <FontAwesomeIcon icon={faImages} />
            <button>Gallery</button>
          </li>
          <li className="flex py-3 items-center space-x-4 pl-4 hover:bg-gray-600 transition-colors duration-300">
            <FontAwesomeIcon icon={faFolderOpen} />
            <button>Folders</button>
          </li>
          <li className="flex py-3 items-center space-x-4 pl-4 hover:bg-gray-600 transition-colors duration-300">
            <FontAwesomeIcon icon={faShareAlt} />
            <button>Shared</button>
          </li>
          <li className="flex py-3 items-center space-x-4 pl-4 hover:bg-gray-600 transition-colors duration-300">
            <FontAwesomeIcon icon={faClock} />
            <button>Timeline</button>
          </li>
          <li className="flex py-3 items-center space-x-4 pl-4 hover:bg-purple-bg transition-colors duration-300">
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

