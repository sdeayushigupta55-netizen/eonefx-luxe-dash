import { MessageSquare, AlertCircle, CheckCircle, CheckCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: "teal" | "destructive" | "success" | "accent";
}

const stats: StatItem[] = [
  { icon: MessageSquare, label: "Total Tickets", value: 1, color: "teal" },
  { icon: AlertCircle, label: "Open Tickets", value: 1, color: "destructive" },
  { icon: CheckCircle, label: "Closed Tickets", value: 0, color: "success" },
  { icon: CheckCheck, label: "Resolved Tickets", value: 1, color: "accent" },
];

const colorStyles = {
  teal: "bg-accent/10 text-accent",
  destructive: "bg-destructive/10 text-destructive",
  success: "bg-success/10 text-success",
  accent: "bg-accent/10 text-accent",
};

export function TicketStats() {
  return (
    <div className="rounded-2xl bg-card p-5 border border-border shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-1 bg-primary rounded-full" />
        <h3 className="text-base font-semibold text-foreground">Ticket Statistics</h3>
      </div>

      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg", colorStyles[stat.color])}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
