import Header from "./Header";
import SideBar from "./Sidebar";
import UploadProvider from "@/providers/uploadModal";
import UploadModal from "./UploadModal";

export default function PrivateLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <UploadProvider>
      <section className="flex flex-col h-screen relative">
        <Header />
        <main className="flex overflow-hidden">
          <SideBar />
          <div className="flex overflow-auto">{children}</div>
        </main>
        <UploadModal />
      </section>
    </UploadProvider>
  );
}
