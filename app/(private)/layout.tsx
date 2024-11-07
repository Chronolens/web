import Header from "./Header";
import SideBar from "./Sidebar";
import UploadModalProvider from "@/providers/uploadModalProvider";
import UploadModal from "./UploadModal";
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
          <div className="flex flex-col w-screen overflow-hidden">
            <Header />
            <main className="grow overflow-auto">{children}</main>
          </div>
          <UploadModal />
        </section>
      </UploadFilesProvider>
    </UploadModalProvider>
  );
}
