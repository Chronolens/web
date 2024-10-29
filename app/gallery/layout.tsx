import Header from "./Header";
import SideBar from "./Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
        <Header />
        <main className="h-screen flex justify-start">
          <SideBar />
          {children}
        </main>
    </section>
  );
}
