import { useState } from "react";
import { Mail, AlertTriangle, ArrowDownToLine, Maximize2, Minimize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderConfig {
  userName: string;
  userEmail: string;
  withdrawRequests: number;
  depositRequests: number;
}

const defaultConfig: DashboardHeaderConfig = {
  userName: "Super Admin",
  userEmail: "admin@brokeret.com",
  withdrawRequests: 3,
  depositRequests: 8,
};

interface DashboardHeaderProps {
  config?: Partial<DashboardHeaderConfig>;
}

export function DashboardHeader({ config }: DashboardHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const mergedConfig = { ...defaultConfig, ...config };

  const { userName, userEmail, withdrawRequests, depositRequests } = mergedConfig;

  return (
    <>
      {/* Backdrop for expanded mode */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div
        className={cn(
          "transition-all duration-300 ease-out animate-fade-in",
          isExpanded
            ? "fixed inset-4 md:inset-8 lg:inset-16 z-50 flex flex-col"
            : "relative"
        )}
      >
        <div
          className={cn(
            "flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch",
            isExpanded && "flex-1"
          )}
        >
          {/* User Greeting Block */}
          <div
            className={cn(
              "flex-1 rounded-xl p-6 bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 border border-border/50",
              isExpanded && "flex-none"
            )}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Hello, {userName}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{userEmail}</span>
            </div>
          </div>

          {/* Highlight Panel */}
          <div
            className={cn(
              "relative rounded-xl p-6 bg-card border border-border shadow-sm",
              isExpanded && "flex-1 flex flex-col"
            )}
          >
            {/* Expand/Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10"
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>

            <h2 className="text-sm font-medium text-muted-foreground mb-4 pr-10">
              Explore what's important to review first
            </h2>

            <div
              className={cn(
                "flex flex-col sm:flex-row gap-3",
                isExpanded && "flex-1 items-start"
              )}
            >
              {/* Withdraw Requests Button */}
              <button
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-[1.02]",
                  withdrawRequests > 0
                    ? "bg-destructive text-destructive-foreground shadow-md hover:shadow-lg"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
                disabled={withdrawRequests === 0}
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Withdraw Requests ({withdrawRequests})</span>
              </button>

              {/* Deposit Requests Button */}
              <button
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-[1.02]",
                  depositRequests > 0
                    ? "bg-[hsl(220,60%,35%)] text-white shadow-md hover:shadow-lg hover:bg-[hsl(220,60%,40%)]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
                disabled={depositRequests === 0}
              >
                <ArrowDownToLine className="h-4 w-4" />
                <span>Deposit Requests ({depositRequests})</span>
              </button>
            </div>

            {/* Additional content when expanded */}
            {isExpanded && (
              <div className="mt-6 pt-6 border-t border-border animate-fade-in">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Quick Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Pending Withdrawals</p>
                    <p className="text-2xl font-bold text-destructive">${(withdrawRequests * 350).toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Pending Deposits</p>
                    <p className="text-2xl font-bold text-primary">${(depositRequests * 1200).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
