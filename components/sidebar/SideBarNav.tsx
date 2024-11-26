"use client";
import settingsIcon from "@/public/static/icons/gear.svg";
import galleryIcon from "@/public/static/icons/ImageSquare.svg";
import foldersIcon from "@/public/static/icons/FolderSimple.svg";
import sharedIcon from "@/public/static/icons/Users.svg";
import timelineIcon from "@/public/static/icons/ClockCounterClockwise.svg";
import mapIcon from "@/public/static/icons/MapTrifold.svg";
import { SidebarItem } from "./SideBarItem";

const sidebarItems = [
  { icon: galleryIcon, text: "Gallery", link: "/gallery" },
  { icon: foldersIcon, text: "Folders", link: "/folders" },
  { icon: sharedIcon, text: "Shared", link: "/shared" },
  { icon: timelineIcon, text: "Timeline", link: "/timeline" },
  { icon: mapIcon, text: "Map", link: "/map" },
];

export function SideBarNav() {
  return (
    <nav className="mt-4 h-full">
      <ul className="flex h-full flex-col">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            link={item.link}
          />
        ))}
        <SidebarItem
          className="mt-auto"
          icon={settingsIcon}
          text="Settings"
          link="/settings"
        />
      </ul>
    </nav>
  );
}
