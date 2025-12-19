import { Globe } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const countryData = [
  { name: "Pakistan", value: 35, color: "#6B7280" },
  { name: "India", value: 28, color: "#3CCF4E" },
  { name: "Algeria", value: 15, color: "#D7A928" },
  { name: "Wallis and Futuna", value: 12, color: "#00B7C2" },
  { name: "Portugal", value: 10, color: "#EF4444" },
];

export function TopCountryStatistics() {
  return (
    <div className="dashboard-card p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Top Country Statistics</h3>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={countryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {countryData.map((entry, index) => (
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
        {countryData.map((item) => (
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
