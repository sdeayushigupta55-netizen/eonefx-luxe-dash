import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ibGroupsSidebarItems } from "./ibGroupsData";
import { cn } from "@/lib/utils";

interface IBGroupsSidebarProps {
  activeItem: string;
  onItemClick: (id: string) => void;
}

export function IBGroupsSidebar({ activeItem, onItemClick }: IBGroupsSidebarProps) {
  return (
    <div className="w-56 border-r border-border bg-background/50 flex flex-col h-full">
      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-10 bg-muted/30 border-border text-sm"
          />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 pb-4 space-y-0.5">
        {ibGroupsSidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              activeItem === item.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
