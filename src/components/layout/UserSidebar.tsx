import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
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
  Target,
  Wallet,
  ArrowUpFromLine,
  CreditCard,
  ShieldCheck,
  UserCog,
  Briefcase,
  LineChart,
  BarChart3,
  Network,
  FileText,
  BarChart2,
  ChevronDown,
  X,
  UsersRound,
  Ticket,
  Handshake,
  ShieldAlert,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SubMenuItem {
  label: string;
  href: string;
  
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  subItems?: SubMenuItem[];
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/user/userdashboard" },
  { icon: Wallet, label: "Wallets", href: "/user/wallets" },
  { icon: Users, label: "My Accounts", href: "/user/accounts" },
  {
    icon: CreditCard,
    label: "New Account",
    href: "/user/new-account",
    subItems: [
      { label: "Create Real Account", href: "/user/new-account/real" },
      { label: "Create Demo Account", href: "/user/new-account/demo" },
    ],
  },
  { icon: GitBranch, label: "Set Up Wires", href: "/user/setup-wires" },
  { icon: ArrowUpFromLine, label: "Deposit", href: "/user/deposit" },
  { icon: BarChart2, label: "Transfer", href: "/user/transfer" },
  { icon: ArrowUpFromLine, label: "Withdraw", href: "/user/withdraw" },
  { icon: Activity, label: "History", href: "/user/history" },
  { icon: Network, label: "Request Master IB", href: "/user/request-master-ib" },
  { icon: Ticket, label: "Tickets", href: "/user/tickets" },
];


interface SidebarProps {
  onOpenRiskHub?: () => void;
  onOpenIBGroups?: () => void;
}

export function UserSidebar({ onOpenRiskHub, onOpenIBGroups }: SidebarProps = {}) {
  const { isCollapsed, isMobileOpen, isMobile, setMobileOpen } = useSidebar();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Auto-expand parent if a child route is active
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.subItems) {
        const isChildActive = item.subItems.some(
          (sub) => location.pathname === sub.href || location.pathname.startsWith(sub.href + "/")
        );
        if (isChildActive && !openMenus.includes(item.href)) {
          setOpenMenus((prev) => [...prev, item.href]);
        }
      }
    });
  }, [location.pathname]);

  const toggleSubmenu = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenus((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  
  const isParentActive = (item: MenuItem) => {
    if (location.pathname === item.href) return true;
    if (item.subItems) {
      return item.subItems.some(
        (sub) => location.pathname === sub.href || location.pathname.startsWith(sub.href + "/")
      );
    }
    return false;
  };

  const showCollapsed = isCollapsed && !isMobile;

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center border-b border-sidebar-border transition-all duration-300",
          showCollapsed ? "justify-center px-2 py-5" : "justify-between px-6 py-5"
        )}
      >
        <DynamicLogo size="md" showText={!showCollapsed} />
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
        {menuItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = openMenus.includes(item.href);
          const parentActive = isParentActive(item);
          const isRiskHub = item.href === "/risk-hub";

          // Handle Risk Hub as panel opener
          if (isRiskHub) {
            if (showCollapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        onOpenRiskHub?.();
                        isMobile && setMobileOpen(false);
                      }}
                      className={cn(
                        "sidebar-link justify-center px-2 w-full",
                        parentActive && "active"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 text-primary sidebar-icon transition-all duration-200",
                          parentActive && "icon-glow"
                        )}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-card border-border text-foreground z-[100]"
                  >
                    <div className="font-medium">{item.label}</div>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <div key={item.href}>
                <button
                  onClick={() => {
                    onOpenRiskHub?.();
                    isMobile && setMobileOpen(false);
                  }}
                  className={cn(
                    "sidebar-link group cursor-pointer w-full",
                    parentActive && "active"
                  )}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <item.icon
                      className={cn(
                        "h-5 w-5 text-primary sidebar-icon transition-all duration-200 flex-shrink-0",
                        parentActive && "icon-glow"
                      )}
                    />
                    <span className="font-medium truncate">{item.label}</span>
                  </div>
                </button>
              </div>
            );
          }

          if (showCollapsed) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "sidebar-link justify-center px-2",
                      parentActive && "active"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 text-primary sidebar-icon transition-all duration-200",
                        parentActive && "icon-glow"
                      )}
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-card border-border text-foreground z-[100]"
                >
                  <div className="font-medium">{item.label}</div>
                  {hasSubItems && (
                    <div className="mt-2 space-y-1">
                      {item.subItems!.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          className={cn(
                            "block text-sm py-1 text-muted-foreground hover:text-foreground",
                            isActive(sub.href) && "text-primary font-medium"
                          )}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <div key={item.href}>
              {/* Parent Menu Item */}
              <div
                className={cn(
                  "sidebar-link group cursor-pointer",
                  parentActive && "active"
                )}
              >
                <Link
                  to={item.href}
                  onClick={() => isMobile && !hasSubItems && setMobileOpen(false)}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 text-primary sidebar-icon transition-all duration-200 flex-shrink-0",
                      parentActive && "icon-glow"
                    )}
                  />
                  <span className="font-medium truncate">{item.label}</span>
                </Link>
                {hasSubItems && (
                  <button
                    onClick={(e) => toggleSubmenu(item.href, e)}
                    className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors ml-auto flex-shrink-0"
                    aria-label={isOpen ? "Collapse submenu" : "Expand submenu"}
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                )}
              </div>

              {/* Submenu */}
              {hasSubItems && (
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="ml-6 pl-4 border-l border-sidebar-border/50 mt-1 space-y-0.5">
                    {item.subItems!.map((sub) => {
                      const isSubActive = isActive(sub.href);
                      return (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          onClick={() => isMobile && setMobileOpen(false)}
                          className={cn(
                            "block py-2 px-3 text-sm rounded-lg transition-all duration-150",
                            "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                            isSubActive && "text-primary bg-primary/10 font-medium"
                          )}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
          !isMobile && (isCollapsed ? "w-[70px]" : "w-64"),
          isMobile && "w-72",
          isMobile && (isMobileOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
        {sidebarContent}
      </aside>
    </TooltipProvider>
  );
}
