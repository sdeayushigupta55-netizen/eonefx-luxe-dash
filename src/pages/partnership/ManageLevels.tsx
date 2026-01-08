import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockManageLevels, ManageLevel } from "./partnershipData";

const ManageLevels = () => {
  const [activeTab, setActiveTab] = useState<"metatrader" | "x9trader">("metatrader");

  const filteredLevels = mockManageLevels.filter(
    (level) => level.platform === activeTab
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Manage Levels</h1>
        </div>

        {/* Platform Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("metatrader")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "metatrader"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Metatrader
          </button>
          <button
            onClick={() => setActiveTab("x9trader")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "x9trader"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            X9 Trader
          </button>
        </div>

        {/* Level Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLevels.map((level) => (
            <LevelCard key={level.id} level={level} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

interface LevelCardProps {
  level: ManageLevel;
}

const LevelCard = ({ level }: LevelCardProps) => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <img
                src={level.image}
                alt={level.name}
                className="w-8 h-8 object-contain"
              />
            </div>
          </div>
          <Badge
            variant="outline"
            className={`${
              level.status === "active"
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                : "bg-muted text-muted-foreground border-muted"
            }`}
          >
            {level.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-4">{level.name}</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Leverage</span>
            <span className="text-foreground font-medium">{level.leverage || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Country</span>
            <span className="text-foreground font-medium">{level.country || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tags</span>
            <span className="text-foreground font-medium">{level.tags || "-"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageLevels;
