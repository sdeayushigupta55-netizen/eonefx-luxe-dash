import {
  Users,
  UserCheck,

  Wallet,
  ArrowDownToLine,
  UserPlus,

  HelpCircle,
  Download,
  Upload,
  LineChart,

  ArrowLeftRight,
  LifeBuoy,

} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { VerifyBanner } from "@/components/userdashboard/VerifyBanner";
import { TradingCharts} from "@/components/userdashboard/TradingCharts";
import { RecentTransactions } from "@/components/userdashboard/RecentTransactions";
import { TradingAccounts } from "@/components/userdashboard/TradingAccounts";
import { StatCard } from "@/components/userdashboard/StatCard";

const statsRow1 = [
  { icon: Users, label: "Ready to dive in?", value: "Start your free trail today.", variant: "gold" as const },
   { icon: UserPlus, label: "Ready to get started?", value: "Make your first deposit.", variant: "gold" as const },
    { icon: HelpCircle, label: "Need help along the way?", value: "Create Support Ticket.", variant: "gold" as const },
 
];

const statsRow2 = [
  { icon: Wallet, label: "Total Balance", value: "0", variant: "green" as const },
  { icon: ArrowDownToLine, label: "Current Equity", value: "0", variant: "neutral" as const },
  { icon: UserCheck, label: "Wallet Balance", value: "0", variant: "neutral" as const },
];

const statsRow3 = [
  { icon: Download, value: "Deposit", variant: "neutral" as const, navigation: "/user/deposit" },
  { icon: Upload,  value: "Withdraw", variant: "teal" as const, navigation: "/user/withdraw" },
  { icon: ArrowLeftRight,  value: "Transfer", variant: "neutral" as const, navigation: "/user/transfer" },
  { icon: LineChart, value: "Account", variant: "neutral" as const, navigation: "/user/accounts" },
  { icon: UserCheck, value: "Verification", variant: "neutral" as const, navigation: "/user/userkyc" },
  { icon: LifeBuoy, value: "Support", variant: "neutral" as const, navigation: "/user/tickets" },
];

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <VerifyBanner />

      {/* Stats Row 1 */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {statsRow1.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {statsRow2.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* Stats Row 3 */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
        {statsRow3.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl bg-card p-4 sm:p-5 hover-lift transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={() => navigate(stat.navigation)}
          >
            <div className="flex items-center justify-center rounded-full bg-muted h-16 w-16 mb-3">
              <stat.icon className="h-7 w-7 text-muted-foreground" />
            </div>
            <span className="sm:text-m font-bold text-foreground mt-1">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Trading Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
        <div className="lg:col-span-1 overflow-hidden">
          <TradingAccounts />
        </div>
        <div>
          <TradingCharts />
        </div>
      </div>

      {/* Latest Registered Users */}
      <RecentTransactions />
    </div>
  );
}
