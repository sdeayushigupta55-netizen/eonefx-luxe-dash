import { TrendingUp, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const paymentData = [
  { date: "24 Nov", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "25 Nov", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "26 Nov", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "27 Nov", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "28 Nov", deposit: 211, withdraw: 0, demo: 0, ib: 0 },
  { date: "29 Nov", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "30 Nov", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "01 Dec", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "02 Dec", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "03 Dec", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "04 Dec", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "05 Dec", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "06 Dec", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "07 Dec", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
  { date: "08 Dec", deposit: 0, withdraw: 0, demo: 0, ib: 0 },
];

const legendItems = [
  { color: "#00B7C2", label: "Total Deposit", value: "$211" },
  { color: "#EF4444", label: "Total Withdraw", value: "$0" },
  { color: "#3CCF4E", label: "Total Demo Deposit", value: "$0" },
  { color: "#D7A928", label: "Total IB Bonus", value: "$0" },
];

export function PaymentStatistics() {
  return (
    <div className="dashboard-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Payment Statistics</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">25-12-08</span>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">
              {item.label} <span className="font-medium text-foreground">{item.value}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={paymentData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Bar dataKey="deposit" fill="#00B7C2" radius={[4, 4, 0, 0]} />
            <Bar dataKey="withdraw" fill="#EF4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="demo" fill="#3CCF4E" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ib" fill="#D7A928" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
