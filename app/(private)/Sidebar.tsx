"use client";
import Image from "next/image";
import logo from "@/public/static/images/side-bar-logo.png";
import { useRouter, usePathname } from "next/navigation";
import settingsIcon from "@/public/static/icons/gear.svg";
import galleryIcon from "@/public/static/icons/ImageSquare.svg";
import foldersIcon from "@/public/static/icons/FolderSimple.svg";
import sharedIcon from "@/public/static/icons/Users.svg";
import timelineIcon from "@/public/static/icons/ClockCounterClockwise.svg";
import mapIcon from "@/public/static/icons/MapTrifold.svg";
// import Calendar from "./Calendar"; // Import the Calendar component

const sidebarItems = [
  { icon: galleryIcon, text: "Gallery", link: "/gallery" },
  { icon: foldersIcon, text: "Folders", link: "/folders" },
  { icon: sharedIcon, text: "Shared", link: "/shared" },
  { icon: timelineIcon, text: "Timeline", link: "/timeline" },
  { icon: mapIcon, text: "Map", link: "/map" },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col h-screen w-64 bg-background text-foreground overflow-clip z-40">
      <div className="flex mx-2 h-20 items-center justify-center">
        <Image src={logo} alt="" placeholder="blur" />
      </div>
      <SidebarNav />
      <div className="mt-auto">
        <SidebarItem icon={settingsIcon} text="Settings" link="/settings" />
      </div>
    </aside>
  );
}

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
    "flex py-3 items-center space-x-4 pl-4 cursor-pointer bg-sidebar-button-gradient";
  const className = selected ? selectedClassName : unselectedClassName;
  const router = useRouter();
  return (
    <li
      className={`flex py-3 items-center space-x-4 pl-4 cursor-pointer ${selected ? "bg-gradient-sidebar-button" : "hover:bg-gradient-sidebar-button"}`}
      onClick={() => {
        router.push(link);
      }}
    >
      <Image src={icon} alt={text} />
      <p>{text}</p>
    </li>
  );
}

export function SidebarNav() {
  const pathname = usePathname();
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
