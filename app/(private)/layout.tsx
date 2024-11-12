import SideBar from "@/components/sidebar/SideBar";
import UploadModalProvider from "@/providers/uploadModalProvider";
import UploadFilesProvider from "@/providers/uploadFilesProvider";

export default function PrivateLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <UploadModalProvider>
      <UploadFilesProvider>
        <section className="flex flex-row h-screen relative">
          <SideBar />
            {children}
        </section>
      </UploadFilesProvider>
    </UploadModalProvider>
  );
}
