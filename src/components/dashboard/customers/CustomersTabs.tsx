import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const customerTabs = [
  { id: "all", label: "All Customers", path: "/customers/all" },
  { id: "active", label: "Active Customers", path: "/customers/active" },
  { id: "disabled", label: "Disabled Customers", path: "/customers/disabled" },
  { id: "with-balance", label: "With Balance", path: "/customers/with-balance" },
  { id: "without-balance", label: "Without Balance", path: "/customers/without-balance" },
  { id: "grace-period", label: "Grace Period Customers", path: "/customers/grace-period" },
  { id: "send-email", label: "Send Email to all", path: "/customers/send-email" },
];

interface CustomersTabsProps {
  activeTab: string;
}

export function CustomersTabs({ activeTab }: CustomersTabsProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-6">
      <div className="flex items-center gap-2 flex-wrap">
        {customerTabs.map((tab) => (
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

export function getTabTitle(tabId: string) {
  return customerTabs.find(t => t.id === tabId)?.label || "All Customers";
}
