"use cilent";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export function SidebarItem({
  className,
  icon,
  text,
  link,
}: {
  className?: string;
  icon: any;
  text: string;
  link: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === link;
  return (
    <li
      className={`flex cursor-pointer items-center space-x-4 py-3 pl-4 ${selected ? "bg-gradient-sidebar-button text-blue-light" : "hover:bg-gradient-sidebar-button"}${className ? ` ${className}` : ""}`}
      onClick={() => {
        router.push(link);
      }}
    >
      <Image src={icon} alt={text} />
      <p>{text}</p>
    </li>
  );
}
