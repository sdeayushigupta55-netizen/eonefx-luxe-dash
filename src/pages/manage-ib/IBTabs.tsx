import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Pending IB", href: "/manage-ib/pending" },
  { label: "Approved IB", href: "/manage-ib/approved" },
  { label: "Rejected IB", href: "/manage-ib/rejected" },
  { label: "All IB Logs", href: "/manage-ib/logs" },
  { label: "IB Form", href: "/manage-ib/form" },
  { label: "IB Resources", href: "/manage-ib/resources" },
];

export function IBTabs() {
  const location = useLocation();

  return (
    <div className="flex flex-wrap gap-2 flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.href;
        return (
          <Link
            key={tab.href}
            to={tab.href}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50  hover:bg-muted hover:text-foreground border border-border"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
      <button className="ml-auto px-3 py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
        More
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
