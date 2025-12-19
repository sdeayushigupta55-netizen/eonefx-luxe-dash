import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const { isCollapsed, isMobile } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          // No margin on mobile since sidebar is overlay
          isMobile ? "ml-0" : isCollapsed ? "ml-[70px]" : "ml-64"
        )}
      >
        <Header />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
