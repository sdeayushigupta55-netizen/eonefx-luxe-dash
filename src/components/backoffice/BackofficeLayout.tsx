import { BackofficeSidebarProvider, useBackofficeSidebar } from "@/contexts/BackofficeSidebarContext";
import { BackofficeHeader } from "./BackofficeHeader";
import { BackofficeSidebar } from "./BackofficeSidebar";
import { cn } from "@/lib/utils";

function BackofficeLayoutContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed, isMobileOpen, isMobile, setMobileOpen } = useBackofficeSidebar();

  return (
    <div className="min-h-screen bg-[#0f1115]">
      <BackofficeHeader />
      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className={cn("transition-all duration-300", isCollapsed ? "w-0 overflow-hidden" : "w-56")}>
            <BackofficeSidebar />
          </div>
        )}
        {/* Mobile Sidebar Overlay */}
        {isMobile && isMobileOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-56 z-50 bg-[#0f1115]">
              <BackofficeSidebar />
            </div>
          </>
        )}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
}

export function BackofficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <BackofficeSidebarProvider>
      <BackofficeLayoutContent>{children}</BackofficeLayoutContent>
    </BackofficeSidebarProvider>
  );
}
