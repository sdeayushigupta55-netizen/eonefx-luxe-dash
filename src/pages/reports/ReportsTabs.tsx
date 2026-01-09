import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ReportsTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const tabs = [
    { label: "Transactions", path: "/reports/transactions" },
    { label: "Payment Overview", path: "/reports/payment-overview" },
    { label: "Referral Network Stats", path: "/reports/referral-network" },
    { label: "IB Leaderboard", path: "/reports/ib-leaderboard" },
  ];
  
  return (
    <div className="flex flex-wrap gap-2 flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            
            onClick={() => navigate(tab.path)}
            
            className={cn(
              "px-4 py-2 border rounded-md transition-colors text-sm font-medium",
              isActive && "bg-primary text-primary-foreground"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
