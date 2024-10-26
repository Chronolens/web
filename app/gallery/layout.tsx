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
      <div className="h-screen flex justify-start">
        <SideBar />
        {children}
      </div>
    </section>
  );
}
