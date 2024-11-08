import { SideBarLogo } from "./SideBarLogo";
import { SideBarNav } from "./SideBarNav";

export default function SideBar() {
  return (
    <aside className="z-40 flex h-screen w-64 flex-col overflow-clip bg-background text-foreground">
      <SideBarLogo />
      <SideBarNav />
    </aside>
  );
}
