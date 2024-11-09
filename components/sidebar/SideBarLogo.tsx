import logo from "@/public/static/images/side-bar-logo.png";
import Image from "next/image";

export function SideBarLogo() {
  return (
    <div className="flex h-20 flex-none items-center justify-center bg-gradient-metadata p-4">
      <Image src={logo} alt="" placeholder="blur" />
    </div>
  );
}
