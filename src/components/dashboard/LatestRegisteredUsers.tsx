import { Users, ArrowRight, Edit, Mail, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function LatestRegisteredUsers() {
  return (
    <div className="dashboard-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Latest Registered User</h3>
        </div>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          View All Users
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                User
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Balance
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Profit
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                KYC
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-right py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {latestUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                {/* User */}
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(user.name)}`}
                    >
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Balance */}
                <td className="py-4 px-2">
                  <span className="text-sm text-foreground">{user.balance}</span>
                </td>

                {/* Profit */}
                <td className="py-4 px-2">
                  <span className="text-sm text-foreground">{user.profit}</span>
                </td>

                {/* KYC */}
                <td className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    {user.kycStatus === "verified" ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-500">Verified</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Unverified</span>
                      </>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user.status === "active" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        user.status === "active" ? "text-green-500" : "text-muted-foreground"
                      }`}
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>

                {/* Action */}
                <td className="py-4 px-2">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
