import React from "react";
import { DollarSign, Monitor, UserPlus, TrendingUp, Clock, BookOpen, Calculator } from "lucide-react";

const tools = [
  { icon: DollarSign, title: "Exchange Rate", description: "Convert between different currencies using live exchange rates" },
  { icon: DollarSign, title: "Pip Value", description: "Calculate the monetary value of pips based on position size" },
  { icon: Monitor, title: "Margin", description: "Determine required margin based on lot size and leverage" },
  { icon: UserPlus, title: "Position Size", description: "Find the optimal position size based on your risk parameters" },
  { icon: TrendingUp, title: "Profit/Loss", description: "Calculate potential profit or loss for a forex position" },
  { icon: Clock, title: "Swap", description: "Determine overnight fees for holding positions" },
  { icon: BookOpen, title: "Risk/Reward", description: "Analyze the risk/reward ratio of your trade setups" },
  { icon: Calculator, title: "Lot Size Converter", description: "Convert between standard, mini, and micro lots" },
];

const UserTool = () => {
  return (
    <div className="p-6 border border-border rounded-xl bg-background min-h-screen">
      <h2 className="text-xl font-semibold mb-6">Calculator Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-card p-4 rounded-lg border border-border shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <tool.icon className="text-green-500 h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTool;
