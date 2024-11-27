import logo from "@/public/static/images/main-logo.png";
import Image from "next/image";

export function MainLogo() {
  return (
    <div className="w-[354px] items-center justify-center">
      <Image src={logo} alt="" placeholder="blur" />
    </div>
  );
}
