import SideBar from "@/components/sidebar/SideBar";
import UploadModalProvider from "@/providers/uploadModalProvider";
import UploadFilesProvider from "@/providers/uploadFilesProvider";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UploadModalProvider>
      <UploadFilesProvider>
        <section className="flex flex-row h-screen relative">
          <div className="flex-none">
            <SideBar />
          </div>
          {children}
        </section>
      </UploadFilesProvider>
    </UploadModalProvider>
  );
}
