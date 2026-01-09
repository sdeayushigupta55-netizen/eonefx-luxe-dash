import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Network, Network as NetworkIcon } from "lucide-react";

export function NetworkTab() {
  const [activeTab, setActiveTab] = useState("tree");

  return (
    <Card className="bg-muted/30 border-none p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-foreground">Referral Tree</h2>
        <div className="flex gap-2">
          <Button
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-md font-medium",
              activeTab === "stats"
                ? "bg-foreground text-background"
                : "bg-background text-foreground border"
            )}
            onClick={() => setActiveTab("stats")}
          >
            <NetworkIcon className="h-5 w-5" />
            Network Stats
          </Button>
          <Button
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-md font-medium",
              activeTab === "tree"
                ? "bg-foreground text-background"
                : "bg-background text-foreground border"
            )}
            onClick={() => setActiveTab("tree")}
          >
            <Network className="h-5 w-5" />
          </Button>
           <Button
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-md font-medium",
              activeTab === "tree"
                ? "bg-foreground text-background"
                : "bg-background text-foreground border"
            )}
            onClick={() => setActiveTab("tree")}
          >
            <Network className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="bg-muted/40 rounded-b-lg min-h-[180px] flex items-center justify-center">
        <span className="text-lg text-muted-foreground">No Referral user found</span>
      </div>
    </Card>
  );
}

export default NetworkTab;