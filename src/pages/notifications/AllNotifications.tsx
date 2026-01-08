import { ArrowUpFromLine, ArrowDownToLine, UserPlus, ExternalLink, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

interface NotificationItem {
  id: string;
  icon: React.ElementType;
  message: string;
  timestamp: string;
  type: "deposit" | "withdraw" | "ib" | "general";
}

const allNotifications: NotificationItem[] = [
  {
    id: "1",
    icon: UserPlus,
    message: "Test Account submitted an Introducing Broker application for kumarfx47@gmail.com.",
    timestamp: "3 days ago",
    type: "ib",
  },
  {
    id: "2",
    icon: ArrowUpFromLine,
    message: "Withdraw Request details: TRXORBMI00MKI Bank Transfer - PKR 10.00",
    timestamp: "2 weeks ago",
    type: "withdraw",
  },
  {
    id: "3",
    icon: ArrowDownToLine,
    message: "The manual deposit request details: TRXB2G0ALWZ97 System 10.00",
    timestamp: "2 weeks ago",
    type: "deposit",
  },
  {
    id: "4",
    icon: ArrowUpFromLine,
    message: "Withdraw Request details: TRXORBMI00MKI Bank Transfer - PKR 10.00",
    timestamp: "2 weeks ago",
    type: "withdraw",
  },
  {
    id: "5",
    icon: ArrowDownToLine,
    message: "The manual deposit request details: TRXNK7NJCGD5F Bank-PKR 10.00",
    timestamp: "2 weeks ago",
    type: "deposit",
  },
  {
    id: "6",
    icon: ArrowDownToLine,
    message: "The manual deposit request details: TRXNK7NJCGD5F Bank-PKR 10.00",
    timestamp: "2 weeks ago",
    type: "deposit",
  },
  {
    id: "7",
    icon: ArrowDownToLine,
    message: "The manual deposit request details: TRXSUQSUYH444 Bank-PKR 20.00",
    timestamp: "4 weeks ago",
    type: "deposit",
  },
  {
    id: "8",
    icon: ArrowDownToLine,
    message: "The manual deposit request details: TRXSUQSUYH444 Bank-PKR 20.00",
    timestamp: "4 weeks ago",
    type: "deposit",
  },
  {
    id: "9",
    icon: ArrowDownToLine,
    message: "The manual deposit request details: TRXQAKQBJZZ6R Bank-PKR 100.00",
    timestamp: "4 weeks ago",
    type: "deposit",
  },
  {
    id: "10",
    icon: ArrowDownToLine,
    message: "The manual deposit request details: TRXQAKQBJZZ6R Bank-PKR 100.00",
    timestamp: "4 weeks ago",
    type: "deposit",
  },
];

export default function AllNotifications() {
  const handleMarkAllRead = () => {
    console.log("Marking all as read");
  };

  const handleExplore = (id: string) => {
    console.log("Exploring notification:", id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">All Notifications</h1>
          <Button 
            onClick={handleMarkAllRead}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>

        {/* Notifications List */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          {allNotifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-muted/30 transition-colors ${
                index !== allNotifications.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <notification.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-snug">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleExplore(notification.id)}
                className="ml-4 bg-primary hover:bg-primary/90 text-primary-foreground flex-shrink-0"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Explore
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
