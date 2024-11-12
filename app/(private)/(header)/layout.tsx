import { PrivateHeader } from "@/components/header/Header";
import UploadModal from "@/components/UploadModal";

export default function PrivateLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-screen overflow-hidden">
      <PrivateHeader />
      <main className="h-full overflow-auto">{children}</main>
      <UploadModal />
    </div>
  );
}
