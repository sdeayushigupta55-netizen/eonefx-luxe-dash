import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tabs = [
  { label: "All Activities", href: "/activity-logs/all" },
  { label: "User Activities", href: "/activity-logs/users" },
  { label: "Staff Activities", href: "/activity-logs/staff" },
];

export function ActivityLogsTabs() {
  const location = useLocation();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <Link key={tab.href} to={tab.href}>
            <Button
              variant={location.pathname === tab.href ? "default" : "outline"}
              size="sm"
              className={cn(
                "rounded-md",
                location.pathname === tab.href
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </Button>
          </Link>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-card border-border text-muted-foreground hover:text-foreground"
          >
            More
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border">
          <DropdownMenuItem>Export CSV</DropdownMenuItem>
          <DropdownMenuItem>Export PDF</DropdownMenuItem>
          <DropdownMenuItem>Print</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
