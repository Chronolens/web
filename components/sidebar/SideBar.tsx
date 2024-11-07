import { SideBarLogo } from "./SideBarLogo";
import { SideBarNav } from "./SideBarNav";


export default function SideBar() {
  return (
    <aside className="flex flex-col h-screen w-64 bg-background text-foreground overflow-clip z-40">
      <SideBarLogo />
      <SideBarNav />
    </aside>
  );
}

