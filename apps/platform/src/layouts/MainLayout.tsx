import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;