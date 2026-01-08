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

interface NestedSubItem {
  label: string;
  href: string;
}

interface SubMenuItem {
  label: string;
  href: string;
  nestedItems?: NestedSubItem[];
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  {
    icon: Users,
    label: "Customers",
    href: "/customers",
    subItems: [
      { label: "All Customers", href: "/customers/all" },
      { label: "Active Customers", href: "/customers/active" },
      { label: "Disabled Customers", href: "/customers/disabled" },
      { label: "Grace Period Customers", href: "/customers/grace-period" },
      { label: "Send Email to All", href: "/customers/send-email" },
    ],
  },
  {
    icon: Building2,
    label: "Company Forms",
    href: "/company-forms",
    subItems: [
      { label: "Pending", href: "/company-forms/pending" },
      { label: "Approved", href: "/company-forms/approved" },
      { label: "Rejected", href: "/company-forms/rejected" },
    ],
  },
  {
    icon: GitBranch,
    label: "Branches Forms",
    href: "/branches-forms",
    subItems: [
      { label: "Pending", href: "/branches-forms/pending" },
      { label: "Approved", href: "/branches-forms/approved" },
      { label: "Rejected", href: "/branches-forms/rejected" },
    ],
  },
  {
    icon: Target,
    label: "Leads",
    href: "/leads",
    subItems: [
      { label: "Lead Contact", href: "/leads/contact" },
      { label: "Deals", href: "/leads/deals" },
    ],
  },
  {
    icon: Wallet,
    label: "Deposits",
    href: "/deposits",
    subItems: [
      { label: "Add Deposit", href: "/deposits/add" },
      { label: "Pending Deposits", href: "/deposits/pending" },
      { label: "Deposit History", href: "/deposits/history" },
      { label: "Deposit Vouchers", href: "/deposits/vouchers" },
    ],
  },
  {
    icon: ArrowUpFromLine,
    label: "Withdraw",
    href: "/withdraw",
    subItems: [
      { label: "Add Withdraw", href: "/withdraw/add" },
      { label: "Pending Withdraws", href: "/withdraw/pending" },
      { label: "Withdraw History", href: "/withdraw/history" },
    ],
  },
  {
    icon: CreditCard,
    label: "Withdraw Accounts",
    href: "/withdraw-accounts",
    subItems: [
      { label: "Pending Accounts", href: "/withdraw-accounts/pending" },
      { label: "Approved Accounts", href: "/withdraw-accounts/approved" },
      { label: "Rejected Accounts", href: "/withdraw-accounts/rejected" },
    ],
  },
  {
    icon: ShieldCheck,
    label: "Compliance & KYC",
    href: "/compliance",
    subItems: [
      { label: "Pending KYC", href: "/compliance/pending" },
      { label: "Rejected KYC", href: "/compliance/rejected" },
      { label: "All KYC Logs", href: "/compliance/logs" },
    ],
  },
  { icon: UserCog, label: "Manage Staffs", href: "/manage-staffs" },
  {
    icon: Briefcase,
    label: "Account Type",
    href: "/account-type",
    subItems: [
      { label: "Account Type", href: "/account-type" },
      { label: "IB Account Type", href: "/account-type/ib-account-type" },
      { label: "Account Type Settings", href: "/account-type/settings" },
    ],
  },
  {
    icon: LineChart,
    label: "Trading Accounts",
    href: "/trading-accounts",
    subItems: [
      { 
        label: "Live Accounts", 
        href: "/trading-accounts/live",
        nestedItems: [
          { label: "Pending Accounts", href: "/trading-accounts/live/pending" },
          { label: "Approved Accounts", href: "/trading-accounts/live/approved" },
          { label: "Rejected Accounts", href: "/trading-accounts/live/rejected" },
          { label: "Archived Accounts", href: "/trading-accounts/live/archived" },
        ],
      },
      { 
        label: "Demo Accounts", 
        href: "/trading-accounts/demo",
        nestedItems: [
          { label: "Pending Accounts", href: "/trading-accounts/demo/pending" },
          { label: "Approved Accounts", href: "/trading-accounts/demo/approved" },
          { label: "Rejected Accounts", href: "/trading-accounts/demo/rejected" },
          { label: "Archived Accounts", href: "/trading-accounts/demo/archived" },
        ],
      },
      { label: "Statement Logs", href: "/trading-accounts/statements" },
    ],
  },
  {
    icon: BarChart3,
    label: "Leverage",
    href: "/leverage",
    subItems: [
      { label: "All Leverage", href: "/leverage/all" },
      { label: "Pending Leverage", href: "/leverage/pending" },
    ],
  },
  { icon: ShieldAlert, label: "Risk Hub", href: "/risk-hub" },
  {
    icon: Network,
    label: "Manage IB",
    href: "/manage-ib",
    subItems: [
      { label: "Pending IB", href: "/manage-ib/pending" },
      { label: "Approved IB", href: "/manage-ib/approved" },
      { label: "Rejected IB", href: "/manage-ib/rejected" },
      { label: "All IB Logs", href: "/manage-ib/logs" },
      { label: "IB Form", href: "/manage-ib/form" },
      { label: "IB Resources", href: "/manage-ib/resources" },
    ],
  },
  {
    icon: FileText,
    label: "Custom Accounts",
    href: "/custom-accounts",
    subItems: [
      { label: "Pending Requests", href: "/custom-accounts/pending" },
      { label: "Approved Requests", href: "/custom-accounts/approved" },
      { label: "Rejected Requests", href: "/custom-accounts/rejected" },
      { label: "Manage Forms", href: "/custom-accounts/manage-forms" },
    ],
  },
  {
    icon: BarChart2,
    label: "Reports",
    href: "/reports",
    subItems: [
      { label: "Transactions", href: "/reports/transactions" },
      { label: "Payment Overview", href: "/reports/payment-overview" },
      { label: "Referral Network Stats", href: "/reports/referral-network" },
      { label: "IB Leaderboard", href: "/reports/ib-leaderboard" },
    ],
  },
  { icon: UsersRound, label: "All Subscriber", href: "/subscribers" },
  { icon: Ticket, label: "Tickets", href: "/tickets" },
  {
    icon: Handshake,
    label: "Partnership",
    href: "/partnership",
    subItems: [
      { label: "Manage Levels", href: "/partnership/manage-levels" },
      { label: "Multi IB Levels", href: "/partnership/multi-ib-levels" },
      { label: "Symbols", href: "/partnership/symbols" },
      { label: "Symbol Groups", href: "/partnership/symbol-groups" },
      { label: "Rebate Rules", href: "/partnership/rebate-rules" },
      { label: "IB Groups", href: "/partnership/ib-groups" },
    ],
  },
  {
    icon: Activity,
    label: "Activity Logs",
    href: "/activity-logs",
    subItems: [
      { label: "All Activities", href: "/activity-logs/all" },
      { label: "User Activities", href: "/activity-logs/users" },
      { label: "Staff Activities", href: "/activity-logs/staff" },
    ],
  },
];

interface SidebarProps {
  onOpenRiskHub?: () => void;
  onOpenIBGroups?: () => void;
}

export function Sidebar({ onOpenRiskHub, onOpenIBGroups }: SidebarProps = {}) {
  const { isCollapsed, isMobileOpen, isMobile, setMobileOpen } = useSidebar();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Auto-expand parent if a child route is active
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.subItems) {
        item.subItems.forEach((sub) => {
          // Check nested items
          if (sub.nestedItems) {
            const isNestedActive = sub.nestedItems.some(
              (nested) => location.pathname === nested.href || location.pathname.startsWith(nested.href + "/")
            );
            if (isNestedActive) {
              if (!openMenus.includes(item.href)) {
                setOpenMenus((prev) => [...prev, item.href]);
              }
              if (!openMenus.includes(sub.href)) {
                setOpenMenus((prev) => [...prev, sub.href]);
              }
            }
          }
        });
        
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
                      const hasNestedItems = sub.nestedItems && sub.nestedItems.length > 0;
                      const isNestedOpen = openMenus.includes(sub.href);
                      const isSubActive = isActive(sub.href) || (sub.nestedItems?.some(n => isActive(n.href)));

                      if (hasNestedItems) {
                        return (
                          <div key={sub.href}>
                            <div
                              className={cn(
                                "flex items-center py-2 px-3 text-sm rounded-lg transition-all duration-150 cursor-pointer",
                                "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                                isSubActive && "text-primary bg-primary/10 font-medium"
                              )}
                            >
                              <Link
                                to={sub.href}
                                onClick={() => isMobile && setMobileOpen(false)}
                                className="flex-1"
                              >
                                {sub.label}
                              </Link>
                              <button
                                onClick={(e) => toggleSubmenu(sub.href, e)}
                                className="p-1 rounded hover:bg-muted/50 transition-colors flex-shrink-0"
                                aria-label={isNestedOpen ? "Collapse" : "Expand"}
                              >
                                <ChevronDown
                                  className={cn(
                                    "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                                    isNestedOpen && "rotate-180"
                                  )}
                                />
                              </button>
                            </div>
                            {/* Nested Items */}
                            <div
                              className={cn(
                                "overflow-hidden transition-all duration-300 ease-in-out",
                                isNestedOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                              )}
                            >
                              <div className="ml-4 pl-3 border-l border-sidebar-border/30 mt-1 space-y-0.5">
                                {sub.nestedItems!.map((nested) => (
                                  <Link
                                    key={nested.href}
                                    to={nested.href}
                                    onClick={() => isMobile && setMobileOpen(false)}
                                    className={cn(
                                      "block py-1.5 px-3 text-xs rounded-lg transition-all duration-150",
                                      "text-sidebar-foreground/80 hover:text-foreground hover:bg-sidebar-accent",
                                      isActive(nested.href) && "text-primary bg-primary/10 font-medium"
                                    )}
                                  >
                                    {nested.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Handle IB Groups as panel opener
                      const isIBGroups = sub.href === "/partnership/ib-groups";
                      
                      if (isIBGroups) {
                        return (
                          <button
                            key={sub.href}
                            onClick={() => {
                              onOpenIBGroups?.();
                              isMobile && setMobileOpen(false);
                            }}
                            className={cn(
                              "block w-full text-left py-2 px-3 text-sm rounded-lg transition-all duration-150",
                              "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                              isActive(sub.href) && "text-primary bg-primary/10 font-medium"
                            )}
                          >
                            {sub.label}
                          </button>
                        );
                      }

                      return (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          onClick={() => isMobile && setMobileOpen(false)}
                          className={cn(
                            "block py-2 px-3 text-sm rounded-lg transition-all duration-150",
                            "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                            isActive(sub.href) && "text-primary bg-primary/10 font-medium"
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
