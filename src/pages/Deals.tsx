import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, User } from "lucide-react";

const columns = [
  { id: "generated", title: "Generated", color: "bg-blue-500" },
  { id: "ongoing", title: "On Going", color: "bg-yellow-500" },
  { id: "win", title: "Win", color: "bg-green-500" },
  { id: "lost", title: "Lost", color: "bg-red-500" },
];

const mockDeals = [
  {
    id: "1",
    column: "win",
    title: "New Customer",
    value: "USD 5000.00",
    contact: "Noman Deal",
  },
];

export default function Deals() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Deals</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Pipeline:</span>
              <Select defaultValue="sales">
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder="Select Pipeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Pipeline</SelectItem>
                  <SelectItem value="marketing">Marketing Pipeline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => navigate("/leads/deals/add")} className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Deal
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-72 bg-card rounded-lg border border-border"
            >
              {/* Column Header */}
              <div className={`h-1 ${column.color} rounded-t-lg`} />
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-4">{column.title}</h3>
                
                {/* Deal Cards */}
                <div className="space-y-3">
                  {mockDeals
                    .filter((deal) => deal.column === column.id)
                    .map((deal) => (
                      <div
                        key={deal.id}
                        className="bg-muted/50 rounded-lg p-3 border border-border cursor-pointer hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{deal.title}</span>
                          <span className="text-sm text-muted-foreground">{deal.value}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          {deal.contact}
                        </div>
                      </div>
                    ))}
                  
                  {/* Add Deal Button */}
                  <button
                    onClick={() => navigate("/leads/deals/add")}
                    className="w-full flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg border border-dashed border-border transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
