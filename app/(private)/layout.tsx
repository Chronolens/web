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
      <section className="flex flex-col h-screen relative">
        <Header />
        <main className="flex overflow-hidden">
          <SideBar />
          <div className="flex overflow-auto">{children}</div>
        </main>
        <UploadModal />
      </section>
      </UploadFilesProvider>
    </UploadModalProvider>
  );
}
