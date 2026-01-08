import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    <div className="flex items-center gap-2 flex-wrap">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Button
            key={tab.path}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => navigate(tab.path)}
            className={isActive 
              ? "bg-primary text-primary-foreground" 
              : "border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent"
            }
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}
