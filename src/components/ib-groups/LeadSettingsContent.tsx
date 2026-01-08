import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { leadSources, pipelineStages } from "./sidebarPagesData";

const leadSettingsTabs = [
  { id: "lead-source", label: "Lead Source" },
  { id: "pipeline", label: "Pipeline" },
];

export function LeadSettingsContent() {
  const [activeTab, setActiveTab] = useState("lead-source");

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          {activeTab === "lead-source" ? "Lead Source" : "Pipeline"}
        </h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" />
          {activeTab === "lead-source" ? "Add New Source" : "Add New Stage"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {leadSettingsTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium w-16">#</TableHead>
              <TableHead className="text-muted-foreground font-medium">NAME</TableHead>
              <TableHead className="text-muted-foreground font-medium">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(activeTab === "lead-source" ? leadSources : pipelineStages).map((item) => (
              <TableRow key={item.id} className="border-border">
                <TableCell className="text-foreground">{item.id}</TableCell>
                <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-4 py-3 border-t border-border">
          <span className="text-sm text-muted-foreground">
            Showing 1 to {activeTab === "lead-source" ? leadSources.length : pipelineStages.length} of {activeTab === "lead-source" ? leadSources.length : pipelineStages.length} results
          </span>
        </div>
      </div>
    </div>
  );
}
