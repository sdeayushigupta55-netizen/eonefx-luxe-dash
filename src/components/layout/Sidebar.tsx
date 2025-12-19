import { NavLink } from "@/components/NavLink";
import { DynamicLogo } from "@/components/theme/DynamicLogo";
import { useSidebar } from "@/contexts/SidebarContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Users,
  Building2,
  GitBranch,
  UserCheck,
  Wallet,
  ArrowUpFromLine,
  CreditCard,
  ShieldCheck,
  UserCog,
  Briefcase,
  LineChart,
  BarChart3,
  AlertTriangle,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  hasSubmenu?: boolean;
  group?: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", group: "main" },
  { icon: Users, label: "Customers", href: "/customers", hasSubmenu: true, group: "main" },
  { icon: Building2, label: "Company Forms", href: "/company-forms", hasSubmenu: true, group: "main" },
  { icon: GitBranch, label: "Branches Forms", href: "/branches-forms", hasSubmenu: true, group: "main" },
  { icon: UserCheck, label: "Leads", href: "/leads", hasSubmenu: true, group: "main" },
  { icon: Wallet, label: "Deposits", href: "/deposits", hasSubmenu: true, group: "finance" },
  { icon: ArrowUpFromLine, label: "Withdraw", href: "/withdraw", hasSubmenu: true, group: "finance" },
  { icon: CreditCard, label: "Withdraw Accounts", href: "/withdraw-accounts", hasSubmenu: true, group: "finance" },
  { icon: ShieldCheck, label: "Compliance & KYC", href: "/compliance", hasSubmenu: true, group: "finance" },
  { icon: UserCog, label: "Manage Staffs", href: "/manage-staffs", group: "settings" },
  { icon: Briefcase, label: "Account Type", href: "/account-type", hasSubmenu: true, group: "settings" },
  { icon: LineChart, label: "Trading Accounts", href: "/trading-accounts", hasSubmenu: true, group: "settings" },
  { icon: BarChart3, label: "Leverage", href: "/leverage", hasSubmenu: true, group: "settings" },
  { icon: AlertTriangle, label: "Risk Hub", href: "/risk-hub", group: "settings" },
];

// Group items by their group
const groupedItems = sidebarItems.reduce((acc, item) => {
  const group = item.group || "other";
  if (!acc[group]) acc[group] = [];
  acc[group].push(item);
  return acc;
}, {} as Record<string, SidebarItem[]>);

const groupOrder = ["main", "finance", "settings"];

export function Sidebar() {
  const { isCollapsed, isMobileOpen, isMobile, setMobileOpen } = useSidebar();

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center border-b border-sidebar-border transition-all duration-300",
          isCollapsed && !isMobile ? "justify-center px-2 py-5" : "justify-between px-6 py-5"
        )}
      >
        <DynamicLogo size="md" showText={!isCollapsed || isMobile} />
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(false)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {groupOrder.map((groupName, groupIndex) => (
          <div key={groupName}>
            {/* Divider between groups */}
            {groupIndex > 0 && (
              <div
                className={cn(
                  "my-3 border-t border-sidebar-border/50",
                  isCollapsed && !isMobile ? "mx-1" : "mx-2"
                )}
              />
            )}

            {groupedItems[groupName]?.map((item) => {
              const showCollapsed = isCollapsed && !isMobile;

              const linkContent = (
                <NavLink
                  to={item.href}
                  onClick={() => isMobile && setMobileOpen(false)}
                  className={cn(
                    "sidebar-link group",
                    showCollapsed && "justify-center px-2"
                  )}
                  activeClassName="active"
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 text-primary sidebar-icon transition-all duration-200 group-hover:icon-glow flex-shrink-0",
                      showCollapsed && "mx-auto"
                    )}
                  />
                  <span
                    className={cn(
                      "flex-1 font-medium whitespace-nowrap transition-all duration-300",
                      showCollapsed
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100 ml-3"
                    )}
                  >
                    {item.label}
                  </span>
                  {item.hasSubmenu && !showCollapsed && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  )}
                </NavLink>
              );

              if (showCollapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-card border-border text-foreground"
                    >
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <div key={item.href}>{linkContent}</div>;
            })}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen gradient-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
          // Desktop
          !isMobile && (isCollapsed ? "w-[70px]" : "w-64"),
          // Mobile
          isMobile && "w-72",
          isMobile && (isMobileOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
        {sidebarContent}
      </aside>
    </TooltipProvider>
  );
}
