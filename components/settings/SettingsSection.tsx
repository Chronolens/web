import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { ReactNode } from "react";

export function SettingsSection({
  icon,
  title,
  description,
  redirect,
  children,
}: {
  icon: StaticImport;
  title: string;
  description: string;
  redirect?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={redirect}
      className={`flex flex-row ${redirect ? "cursor-pointer" : ""}`}
    >
      <Image className="flex-none" src={icon} width={60} height={60} alt="" />
      <div className="flex flex-col ml-3 space-y-0.5 justify-center">
        <h2 className="text-xl"> {title}</h2>
        {children}
        <span className="text-gray-info text-xs">{description}</span>
      </div>
    </a>
  );
}
