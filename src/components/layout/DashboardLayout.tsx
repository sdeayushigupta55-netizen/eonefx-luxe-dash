import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { RiskHubPanel } from "@/components/riskhub/RiskHubPanel";
import { IBGroupsPanel } from "@/components/ib-groups";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const { isCollapsed, isMobile } = useSidebar();
  const [isRiskHubOpen, setIsRiskHubOpen] = useState(false);
  const [isIBGroupsOpen, setIsIBGroupsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        onOpenRiskHub={() => setIsRiskHubOpen(true)} 
        onOpenIBGroups={() => setIsIBGroupsOpen(true)}
      />
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          // No margin on mobile since sidebar is overlay
          isMobile ? "ml-0" : isCollapsed ? "ml-[70px]" : "ml-64"
        )}
      >
        <Header onOpenRiskHub={() => setIsRiskHubOpen(true)} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
      <RiskHubPanel isOpen={isRiskHubOpen} onClose={() => setIsRiskHubOpen(false)} />
      <IBGroupsPanel isOpen={isIBGroupsOpen} onClose={() => setIsIBGroupsOpen(false)} />
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
