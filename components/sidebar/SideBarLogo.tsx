import Image from "next/image";
import logo from "@/public/static/images/side-bar-logo.png";

export function SideBarLogo() {
  return (
    <div className="flex flex-none p-4 h-20 bg-gradient-metadata items-center justify-center">
      <Image src={logo} alt="" placeholder="blur" />
    </div>
  );
}
