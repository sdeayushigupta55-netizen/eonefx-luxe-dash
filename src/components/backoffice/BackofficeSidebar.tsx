import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Users, ChevronDown, Building2, CircleDollarSign, ArrowUpFromLine, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubMenuItem {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Customers",
    url: "/backoffice/customers",
    icon: Users,
    subItems: [
      { title: "All Customers", url: "/backoffice/customers" },
      { title: "Active Customers", url: "/backoffice/customers/active" },
      { title: "Disabled Customers", url: "/backoffice/customers/disabled" },
      { title: "Grace Period Customers", url: "/backoffice/customers/grace-period" },
      { title: "Send Email to all", url: "/backoffice/customers/send-email" },
    ],
  },
  {
    title: "Company Forms",
    url: "/backoffice/company-forms/pending",
    icon: Building2,
    subItems: [
      { title: "Pending", url: "/backoffice/company-forms/pending" },
      { title: "Approved", url: "/backoffice/company-forms/approved" },
      { title: "Rejected", url: "/backoffice/company-forms/rejected" },
    ],
  },
  {
    title: "Deposits",
    url: "/backoffice/deposit/add",
    icon: CircleDollarSign,
    subItems: [
      { title: "Add Deposit", url: "/backoffice/deposit/add" },
      { title: "Pending Deposits", url: "/backoffice/deposit/pending" },
      { title: "Deposit History", url: "/backoffice/deposit/history" },
      { title: "Deposit Vouchers", url: "/backoffice/deposit/vouchers" },
    ],
  },
  {
    title: "Withdraw",
    url: "/backoffice/withdraw/add",
    icon: ArrowUpFromLine,
    subItems: [
      { title: "Add Withdraw", url: "/backoffice/withdraw/add" },
      { title: "Pending Withdraws", url: "/backoffice/withdraw/pending" },
      { title: "Withdraw History", url: "/backoffice/withdraw/history" },
    ],
  },
  {
    title: "Withdraw Accounts",
    url: "/backoffice/withdraw-accounts/pending",
    icon: Wallet,
    subItems: [
      { title: "Pending Accounts", url: "/backoffice/withdraw-accounts/pending" },
      { title: "Approved Accounts", url: "/backoffice/withdraw-accounts/approved" },
      { title: "Rejected Accounts", url: "/backoffice/withdraw-accounts/rejected" },
    ],
  },
];

export function BackofficeSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Customers"]);

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.subItems) {
        const isChildActive = item.subItems.some((sub) => 
          location.pathname === sub.url || location.pathname.startsWith(sub.url + "/")
        );
        if (isChildActive && !expandedItems.includes(item.title)) {
          setExpandedItems((prev) => [...prev, item.title]);
        }
      }
    });
  }, [location.pathname]);

  const isActive = (url: string) => location.pathname === url;
  const isParentActive = (item: MenuItem) => {
    if (isActive(item.url)) return true;
    return item.subItems?.some((sub) => isActive(sub.url)) || false;
  };

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  return (
    <aside className="w-56 bg-gradient-to-b from-[#0f1115] to-[#1a1d23] min-h-full flex-shrink-0 border-r border-[#2a2f3a]">
      <nav className="py-4 px-2">
        {menuItems.map((item) => (
          <div key={item.title} className="mb-1">
            <div
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group",
                isParentActive(item)
                  ? "bg-[#D7A928]/10 text-[#D7A928] shadow-[0_0_15px_rgba(215,169,40,0.15)]"
                  : "text-gray-400 hover:bg-[#1a1f28] hover:text-white"
              )}
              onClick={() => toggleExpand(item.title)}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5", isParentActive(item) ? "text-[#D7A928]" : "text-gray-500")} />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
              {item.subItems && (
                <ChevronDown className={cn("h-4 w-4 transition-transform", expandedItems.includes(item.title) && "rotate-180")} />
              )}
            </div>
            {item.subItems && expandedItems.includes(item.title) && (
              <div className="mt-1 space-y-1 ml-4">
                {item.subItems.map((subItem) => (
                  <div
                    key={subItem.title}
                    onClick={() => navigate(subItem.url)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all",
                      isActive(subItem.url) ? "text-[#D7A928]" : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", isActive(subItem.url) ? "bg-[#D7A928]" : "bg-gray-600")} />
                    <span className="text-sm">{subItem.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
