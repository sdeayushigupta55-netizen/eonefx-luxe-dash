import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  UserPlus, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Users, 
  CreditCard, 
  Wallet,
  X,
  Maximize2,
  Minimize2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AddCustomerModal } from "@/components/customers/AddCustomerModal";

interface QuickActionItem {
  id: string;
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
  route?: string;
}

interface QuickActionGroup {
  id: string;
  title: string;
  items: QuickActionItem[];
}

interface QuickActionsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickActionsDropdown({ isOpen, onClose }: QuickActionsDropdownProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const quickActionsConfig: QuickActionGroup[] = [
    {
      id: "general",
      title: "GENERAL",
      items: [
        { 
          id: "add-customer", 
          label: "Add New Customer", 
          icon: UserPlus,
          onClick: () => setIsAddCustomerOpen(true)
        },
      ],
    },
    {
      id: "finance",
      title: "FINANCE",
      items: [
        { id: "add-deposit", label: "Add Deposit", icon: ArrowDownToLine, route: "/deposits/add" },
        { id: "add-withdrawal", label: "Add Withdrawal", icon: ArrowUpFromLine, route: "/withdraw/add" },
      ],
    },
    {
      id: "manage",
      title: "MANAGE",
      items: [
        { id: "add-staff", label: "Add New Staff", icon: Users, route: "/manage-staffs" },
        { id: "account-type", label: "Account Type", icon: CreditCard, route: "/account-type" },
        { id: "deposit-method", label: "Deposit Method", icon: ArrowDownToLine, route: "/deposits/pending" },
        { id: "withdrawal-method", label: "Withdrawal Method", icon: Wallet, route: "/withdraw/pending" },
      ],
    },
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        setIsFullscreen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
        setIsFullscreen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setIsFullscreen(false);
    }
  }, [isOpen]);

  if (!isOpen && !isAddCustomerOpen) return null;

  const handleItemClick = (item: QuickActionItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.route) {
      navigate(item.route);
    }
    onClose();
    setIsFullscreen(false);
  };

  return (
    <>
      {/* Add Customer Modal */}
      <AddCustomerModal 
        isOpen={isAddCustomerOpen} 
        onClose={() => setIsAddCustomerOpen(false)} 
      />

      {isOpen && (
        <>
          {/* Backdrop for fullscreen mode */}
          {isFullscreen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
              onClick={() => {
                onClose();
                setIsFullscreen(false);
              }}
            />
          )}

          <div
            ref={dropdownRef}
            className={cn(
              "z-50 bg-card border border-border rounded-xl shadow-xl transition-all duration-300 ease-out",
              isFullscreen
                ? "fixed inset-4 md:inset-8 lg:inset-16 animate-scale-in overflow-auto"
                : "absolute right-0 top-full mt-2 w-[340px] md:w-[520px] lg:w-[680px] animate-fade-in"
            )}
          >
            {/* Header with expand/close buttons */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => {
                    onClose();
                    setIsFullscreen(false);
                  }}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className={cn(
              "p-4 grid gap-6",
              isFullscreen
                ? "grid-cols-1 md:grid-cols-3"
                : "grid-cols-1 md:grid-cols-3"
            )}>
              {quickActionsConfig.map((group) => (
                <div key={group.id} className="space-y-3">
                  {/* Group Title */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-wider text-primary">
                      {group.title}
                    </span>
                  </div>

                  {/* Group Items */}
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-foreground hover:bg-muted/80 transition-all duration-200 group"
                      >
                        <div className="p-1.5 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                          <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
