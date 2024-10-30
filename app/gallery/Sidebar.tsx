import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faFolderOpen,
  faShareAlt,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { redirect } from "next/navigation";
// import Calendar from "./Calendar"; // Import the Calendar component

export function SidebarItem({
  icon,
  text,
  link,
}: {
  icon: any;
  text: string;
  link: string;
}) {
  return (
    <li className="flex py-3 items-center space-x-4 pl-4 cursor-pointer bg-background">
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </li>
  );
}

const sidebarItems = [
  { icon: faImages, text: "Gallery", link: "/gallery" },
  { icon: faFolderOpen, text: "Folders", link: "/folders" },
  { icon: faShareAlt, text: "Shared", link: "/shared" },
  { icon: faClock, text: "Timeline", link: "/timeline" },
  { icon: faMapMarkerAlt, text: "Map", link: "/map" },
];
export function SidebarNav() {
  return (
    <nav>
      <ul>
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            link={item.link}
          />
        ))}
      </ul>
    </nav>
  );
}

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-background text-foreground overflow-clip">
      <SidebarNav />
    </aside>
  );
}
