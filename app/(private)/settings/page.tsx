"use client";
import userAvatar from "@/public/static/images/user-avatar.png";
import Image from "next/image";
import storageIcon from "@/public/static/icons/Cloud.svg";
import activityIcon from "@/public/static/icons/List.svg";
import { signOut } from "next-auth/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

export default function SettingsPage() {
  return (
    <div className="w-full h-full flex flex-col pl-10 pt-16 pr-36">
      <UserDetails />
      <div className="mt-10">
        <div className="w-full px-3 py-6">
          <SettingsSection
            icon={storageIcon}
            title="Storage Usage"
            description="65,4 GB of 100 GB used"
          />
          <Divider />
          <SettingsSection
            icon={activityIcon}
            title="Activity History"
            description="Check operation history such as uploads, issues, and other general activity information"
          />
          <Divider />
          <div className="flex w-full justify-end">
            <button
              onClick={() => {
                signOut();
              }}
              className="bg-red-light px-12 py-3 rounded-lg text-foreground"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: StaticImport;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <Image className="flex-none" src={icon} width={60} height={60} alt="" />
      <div className="flex flex-col ml-3 space-y-0.5 justify-center">
        <h2 className="text-xl"> {title}</h2>
        {children}
        <span className="text-gray-500 text-xs">{description}</span>
      </div>
    </div>
  );
}

function Divider() {
  return <hr className="w-full my-6 h-[1px] border-t-0 bg-gray-600" />;
}

function UserDetails() {
  //FIX: Replace with actual user data by fetching it
  const user = {
    name: "John Doe",
    email: "johndoe@placeholder.xyz",
  };
  return (
    <div className="flex flex-row">
      <Image
        className="rounded-full"
        src={userAvatar}
        width={80}
        height={80}
        alt=""
      />
      <div className="flex flex-col ml-5 justify-center">
        <span className="text-xl"> {user.name}</span>
        <span> {user.email}</span>
      </div>
    </div>
  );
}
