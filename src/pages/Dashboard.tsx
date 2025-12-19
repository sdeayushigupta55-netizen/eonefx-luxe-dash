import {
  Users,
  UserCheck,
  UsersRound,
  Wallet,
  ArrowDownToLine,
  UserPlus,
  Send,
  Gift,
  TrendingUp,
  Eye,
  Server,
  HelpCircle,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TicketTable } from "@/components/dashboard/TicketTable";
import { TicketStats } from "@/components/dashboard/TicketStats";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PaymentStatistics } from "@/components/dashboard/PaymentStatistics";
import { DepositStatistics } from "@/components/dashboard/DepositStatistics";
import { TopCountryStatistics } from "@/components/dashboard/TopCountryStatistics";
import { BrowserStatistics } from "@/components/dashboard/BrowserStatistics";
import { OSStatistics } from "@/components/dashboard/OSStatistics";
import { LatestRegisteredUsers } from "@/components/dashboard/LatestRegisteredUsers";

const statsRow1 = [
  { icon: Users, label: "Registered User", value: "28", variant: "gold" as const },
  { icon: UserCheck, label: "Active Users", value: "28", variant: "gold" as const },
  { icon: UsersRound, label: "Staff / Team", value: "6", variant: "gold" as const },
  { icon: Wallet, label: "Total Deposits", value: "$15,425.00", variant: "teal" as const },
];

const statsRow2 = [
  { icon: ArrowDownToLine, label: "Total Withdraw", value: "$1,121.00", variant: "green" as const },
  { icon: UserPlus, label: "Total Referral", value: "9", variant: "neutral" as const },
  { icon: Send, label: "Total Transfers", value: "$29.00", variant: "neutral" as const },
];

const statsRow3 = [
  { icon: Gift, label: "Total IB Bonus", value: "$0.00", variant: "neutral" as const },
  { icon: TrendingUp, label: "Live Accounts", value: "7", variant: "teal" as const },
  { icon: Eye, label: "Demo Accounts", value: "2", variant: "neutral" as const },
  { icon: Server, label: "Total Gateways", value: "9", variant: "neutral" as const },
  { icon: HelpCircle, label: "Total Ticket", value: "1", variant: "neutral" as const },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Dashboard Header with Greeting and Highlight Panel */}
      <DashboardHeader />

      {/* Stats Row 1 */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
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
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
        {statsRow3.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* Tickets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5">
        <div className="lg:col-span-2 overflow-hidden">
          <TicketTable />
        </div>
        <div>
          <TicketStats />
        </div>
      </div>

      {/* Payment & Deposit Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5">
        <div className="lg:col-span-2 overflow-hidden">
          <PaymentStatistics />
        </div>
        <div>
          <DepositStatistics />
        </div>
      </div>

      {/* Country, Browser, OS Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        <TopCountryStatistics />
        <BrowserStatistics />
        <OSStatistics />
      </div>

      {/* Latest Registered Users */}
      <LatestRegisteredUsers />
    </div>
  );
}
