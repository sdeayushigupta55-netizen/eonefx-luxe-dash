import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IBGroupsSidebar } from "./IBGroupsSidebar";
import { CustomerContent } from "./CustomerContent";
import { RolesPermissionsContent } from "./RolesPermissionsContent";
import { LeadSettingsContent } from "./LeadSettingsContent";
import { KYCComplianceContent } from "./KYCComplianceContent";
import { UserRankingsContent } from "./UserRankingsContent";

interface IBGroupsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IBGroupsPanel({ isOpen, onClose }: IBGroupsPanelProps) {
  const [activeSidebarItem, setActiveSidebarItem] = useState("customer");

  const renderContent = () => {
    switch (activeSidebarItem) {
      case "customer":
        return <CustomerContent />;
      case "roles-permissions":
        return <RolesPermissionsContent />;
      case "lead-settings":
        return <LeadSettingsContent />;
      case "kyc-compliance":
        return <KYCComplianceContent />;
      case "user-rankings":
        return <UserRankingsContent />;
      default:
        return <CustomerContent />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-6xl bg-background border-l border-border shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-xl font-semibold text-foreground">IB Groups</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content with Internal Sidebar */}
          <div className="flex flex-1 overflow-hidden">
            <IBGroupsSidebar
              activeItem={activeSidebarItem}
              onItemClick={setActiveSidebarItem}
            />
            <div className="flex-1 overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
