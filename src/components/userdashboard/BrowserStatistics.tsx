import { Monitor } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const browserData = [
  { name: "Chrome", value: 45, color: "#6B7280" },
  { name: "Edge", value: 20, color: "#3CCF4E" },
  { name: "Firefox", value: 15, color: "#EF4444" },
  { name: "Safari", value: 12, color: "#00B7C2" },
  { name: "Opera", value: 8, color: "#D7A928" },
];

export function BrowserStatistics() {
  return (
    <div className="dashboard-card p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Monitor className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Best Browser Statistics</h3>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={browserData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {browserData.map((entry, index) => (
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
      <div className="flex justify-center gap-3 mt-4 flex-wrap">
        {browserData.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
