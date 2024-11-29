import { PrivateHeader } from "@/components/header/Header";
import UploadModal from "@/components/uploadModal/UploadModal";

export default function PrivateLayoutWithHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-screen overflow-hidden">
      <PrivateHeader />
      <main className="h-full overflow-hidden">{children}</main>
      <UploadModal />
    </div>
  );
}
