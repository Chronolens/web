import { Divider } from "@/components/settings/Divider";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { SignOutButton } from "@/components/settings/SignOutButton";
import { UserDetails } from "@/components/settings/UserDetails";
import storageIcon from "@/public/static/icons/Cloud.svg";
import activityIcon from "@/public/static/icons/List.svg";

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
            redirect="/settings/activity"
          />
          <Divider />
          <div className="flex w-full justify-end">
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
