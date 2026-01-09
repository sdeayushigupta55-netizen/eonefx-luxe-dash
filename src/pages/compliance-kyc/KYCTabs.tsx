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
              "px-4 py-2 border rounded-md transition-colors text-sm font-medium",
              activeTab === tab.id && "bg-primary text-primary-foreground"
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
