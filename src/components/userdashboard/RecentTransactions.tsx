import { ArrowRight, ArrowDownToLine } from "lucide-react";


interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  balance: string;
  profit: string;
  kycStatus: "verified" | "unverified";
  status: "active" | "inactive";
}

const latestUsers: User[] = [
  {
    id: "1",
    name: "Racheal Jameel",
    email: "richirrrfccej43743@gmail.com",
    balance: "$0",
    profit: "$0",
    kycStatus: "unverified",
    status: "active",
  },
  {
    id: "2",
    name: "Aieman Basit",
    email: "aimanbasit0416@gmail.com",
    balance: "$0",
    profit: "$0",
    kycStatus: "verified",
    status: "active",
  },
  {
    id: "3",
    name: "Bilawal Iqbal",
    email: "bilawal@beyondtechservices.com",
    balance: "$0",
    profit: "$0",
    kycStatus: "verified",
    status: "active",
  },
  {
    id: "4",
    name: "Test New",
    email: "richirj43743@gmail.com",
    balance: "$0",
    profit: "$0",
    kycStatus: "verified",
    status: "active",
  },
  {
    id: "5",
    name: "Sufyan Test",
    email: "sufyanhashmi301+3@gmail.com",
    balance: "$0",
    profit: "$0",
    kycStatus: "verified",
    status: "active",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-primary",
    "bg-teal-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-purple-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function RecentTransactions() {
  return (
    <div className="dashboard-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <a href="#" className="text-sm font-medium text-foreground hover:underline flex items-center gap-1">
          See All <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Transactions ID</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Gateway</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fee</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              {/* Description with icon and date */}
              <td className="py-4 px-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full bg-muted h-10 w-10">
                    <ArrowDownToLine className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">Deposit With Bank Transfer - AED By Admin</div>
                    <div className="text-xs text-muted-foreground">Nov 18, 2025 12:52</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-2 text-foreground text-sm">TRXHCSTRCLHRI</td>
              <td className="py-4 px-2 text-foreground text-sm">8651346183</td>
              <td className="py-4 px-2 font-semibold text-green text-sm">+5000 USD</td>
              <td className="py-4 px-2 text-foreground text-sm">BAEDF</td>
              <td className="py-4 px-2 text-foreground text-sm">0 USD</td>
              <td className="py-4 px-2">
                <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-3 py-1 rounded">Pending</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
