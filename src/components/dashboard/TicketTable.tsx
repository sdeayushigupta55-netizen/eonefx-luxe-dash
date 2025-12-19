import { MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Ticket {
  id: string;
  subject: string;
  status: "open" | "closed" | "pending";
  created: string;
}

const tickets: Ticket[] = [
  { id: "SUPT223085", subject: "MT5 password", status: "open", created: "Aug 12 2025 07:58" },
  { id: "SUPT223086", subject: "Withdrawal issue", status: "pending", created: "Aug 11 2025 14:22" },
  { id: "SUPT223087", subject: "Account verification", status: "closed", created: "Aug 10 2025 09:15" },
];

const statusStyles = {
  open: "bg-success/20 text-success border-success/30",
  pending: "bg-primary/20 text-primary border-primary/30",
  closed: "bg-muted text-muted-foreground border-muted-foreground/30",
};

export function TicketTable() {
  return (
    <div className="rounded-2xl bg-card p-5 border border-border shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">Latest Tickets</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1">
          See All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Ticket ID
              </th>
              <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Subject
              </th>
              <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Status
              </th>
              <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 text-sm text-muted-foreground">#{ticket.id}</td>
                <td className="py-3 text-sm text-foreground">{ticket.subject}</td>
                <td className="py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-md border ${statusStyles[ticket.status]}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {ticket.status}
                  </span>
                </td>
                <td className="py-3 text-sm text-muted-foreground">{ticket.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
