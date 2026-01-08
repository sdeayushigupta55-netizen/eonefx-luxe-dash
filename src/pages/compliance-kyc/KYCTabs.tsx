import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { kycTabs } from "./complianceData";

interface KYCTabsProps {
  activeTab: string;
}

export function KYCTabs({ activeTab }: KYCTabsProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-6">
      <div className="flex items-center gap-2 flex-wrap">
        {kycTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-muted text-foreground border border-border"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
            )}
          >
            {tab.label}
          </button>
        ))}
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 ml-auto">
          More <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
