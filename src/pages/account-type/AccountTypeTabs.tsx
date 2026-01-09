import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tabs = [
  { label: "Account Type", path: "/account-type" },
  { label: "IB Account Type", path: "/account-type/ib-account-type" },
  { label: "Account Type Settings", path: "/account-type/settings" },
];

export function AccountTypeTabs() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/account-type") {
      return location.pathname === "/account-type";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-wrap gap-2 flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border mb-2">
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all border",
              isActive(tab.path)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent border-border hover:bg-muted/50 hover:text-foreground"
            )}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 border-border">
            More
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border">
          <DropdownMenuItem>Export</DropdownMenuItem>
          <DropdownMenuItem>Import</DropdownMenuItem>
          <DropdownMenuItem>Bulk Actions</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
