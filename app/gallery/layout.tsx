import Header from "./Header";
import SideBar from "./Sidebar";

export default function PrivateLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-screen">
      <Header />
      <main className="flex overflow-hidden">
        <SideBar />
        <div className="flex overflow-auto">{children}</div>
      </main>
    </section>
  );
}
