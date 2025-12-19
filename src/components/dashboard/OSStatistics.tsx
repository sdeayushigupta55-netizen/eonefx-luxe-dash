import { Smartphone } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const osData = [
  { name: "Windows", value: 40, color: "#6B7280" },
  { name: "OS X", value: 20, color: "#3CCF4E" },
  { name: "Linux", value: 15, color: "#EF4444" },
  { name: "AndroidOS", value: 15, color: "#00B7C2" },
  { name: "iOS", value: 10, color: "#D7A928" },
];

export function OSStatistics() {
  return (
    <div className="dashboard-card p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Smartphone className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Best OS Statistics</h3>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={osData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {osData.map((entry, index) => (
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
        {osData.map((item) => (
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
