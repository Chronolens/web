"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faFolderOpen,
  faShareAlt,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";
// import Calendar from "./Calendar"; // Import the Calendar component

const sidebarItems = [
  { icon: faImages, text: "Gallery", link: "/gallery" },
  { icon: faFolderOpen, text: "Folders", link: "/folders" },
  { icon: faShareAlt, text: "Shared", link: "/shared" },
  { icon: faClock, text: "Timeline", link: "/timeline" },
  { icon: faMapMarkerAlt, text: "Map", link: "/map" },
];

export function SidebarItem({
  icon,
  text,
  link,
  selected,
}: {
  icon: any;
  text: string;
  link: string;
  selected: boolean;
}) {
  const unselectedClassName =
    "flex py-3 items-center space-x-4 pl-4 cursor-pointer bg-background hover:bg hover:bg-gradient-to-r from-purple-500 to-background ease-in-out";
  const selectedClassName =
    "flex py-3 items-center space-x-4 pl-4 cursor-pointer bg-gradient-to-r from-purple-500 to-background";
  const className = selected ? selectedClassName : unselectedClassName;
  const router = useRouter();
  return (
    <li
      className={className}
      onClick={() => {
        router.push(link);
      }}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </li>
  );
}

export function SidebarNav({ pathname }) {
  return (
    <nav>
      <ul>
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            link={item.link}
            selected={pathname === item.link}
          />
        ))}
      </ul>
    </nav>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-screen w-64 bg-background text-foreground overflow-clip">
      <SidebarNav pathname={pathname} />
    </aside>
  );
}
