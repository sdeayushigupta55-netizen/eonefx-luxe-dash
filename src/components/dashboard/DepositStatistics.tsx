import { Wallet } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const depositData = [
  { name: "Deposit", value: 45, color: "#3CCF4E" },
  { name: "Demo Deposit", value: 35, color: "#6B7280" },
  { name: "Voucher Deposit", value: 20, color: "#D7A928" },
];

export function DepositStatistics() {
  return (
    <div className="dashboard-card p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Deposit Statistics</h3>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={depositData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {depositData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        {depositData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
