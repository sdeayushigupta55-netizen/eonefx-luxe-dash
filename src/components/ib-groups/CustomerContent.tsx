import { useState } from "react";
import { Plus, Pencil, Trash2, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  riskProfileTags,
  systemTags,
  customerGroups,
  customerPermissions,
} from "./sidebarPagesData";
import { ibGroupsData, ibGroupsTabs } from "./ibGroupsData";

const customerTabs = [
  { id: "risk-profile-tags", label: "Risk Profile Tags" },
  { id: "system-tags", label: "System Tags" },
  { id: "customer-groups", label: "Customer Groups" },
  { id: "ib-groups", label: "IB Groups" },
  { id: "permission", label: "Permission" },
  { id: "misc", label: "Misc" },
];

export function CustomerContent() {
  const [activeTab, setActiveTab] = useState("risk-profile-tags");
  const [permissions, setPermissions] = useState(customerPermissions);
  const [gracePeriod, setGracePeriod] = useState(true);
  const [gracePeriodDays, setGracePeriodDays] = useState("30");

  const togglePermission = (id: string) => {
    setPermissions(permissions.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const getButtonText = () => {
    switch (activeTab) {
      case "customer-groups": return "Add New Group";
      default: return "Add New";
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case "risk-profile-tags": return "Risk Profile Tag";
      case "system-tags": return "System Tag";
      case "customer-groups": return "Customer Groups";
      case "ib-groups": return "IB Groups";
      case "permission": return "Customer Permissions";
      case "misc": return "Customer Misc Settings";
      default: return "";
    }
  };

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">{getTitle()}</h1>
        {activeTab !== "permission" && activeTab !== "misc" && (
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <Plus className="h-4 w-4" />
            {getButtonText()}
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {customerTabs.map((tab) => (
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

      {/* Content based on active tab */}
      {activeTab === "risk-profile-tags" && (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">TAG NAME</TableHead>
                <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
                <TableHead className="text-muted-foreground font-medium">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskProfileTags.map((tag) => (
                <TableRow key={tag.id} className="border-border">
                  <TableCell className="font-medium text-foreground">{tag.name}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                      {tag.status}
                    </Badge>
                  </TableCell>
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
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-sm text-muted-foreground">Showing 1 to 10 of 16 results</span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8">1</Button>
              <Button variant="outline" size="icon" className="h-8 w-8">2</Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "system-tags" && (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">TAG NAME</TableHead>
                <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
                <TableHead className="text-muted-foreground font-medium">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemTags.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    No Data Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="px-4 py-3 border-t border-border">
            <span className="text-sm text-muted-foreground">Showing to of 0 results</span>
          </div>
        </div>
      )}

      {activeTab === "customer-groups" && (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">GROUP NAME</TableHead>
                <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
                <TableHead className="text-muted-foreground font-medium">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerGroups.map((group) => (
                <TableRow key={group.id} className="border-border">
                  <TableCell className="font-medium text-foreground">{group.name}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                      {group.status}
                    </Badge>
                  </TableCell>
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
            <span className="text-sm text-muted-foreground">Showing 1 to 1 of 1 results</span>
          </div>
        </div>
      )}

      {activeTab === "ib-groups" && (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">GROUP NAME</TableHead>
                <TableHead className="text-muted-foreground font-medium">REBATE RULES</TableHead>
                <TableHead className="text-muted-foreground font-medium">ACCOUNT TYPES</TableHead>
                <TableHead className="text-muted-foreground font-medium">GLOBAL ACCOUNT TYPE</TableHead>
                <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
                <TableHead className="text-muted-foreground font-medium">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ibGroupsData.map((group) => (
                <TableRow key={group.id} className="border-border">
                  <TableCell className="font-medium text-foreground">{group.groupName}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {group.rebateRules.map((rule) => (
                        <Badge key={rule} variant="secondary" className="bg-muted/50 text-foreground text-xs">
                          {rule}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {group.accountTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="bg-muted/50 text-foreground text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs", group.globalAccountType === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400")}>
                      {group.globalAccountType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">{group.status}</Badge>
                  </TableCell>
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
        </div>
      )}

      {activeTab === "permission" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-x-16 gap-y-4">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium text-foreground">{permission.label}</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Toggle {permission.label.toLowerCase()}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch
                  checked={permission.enabled}
                  onCheckedChange={() => togglePermission(permission.id)}
                />
              </div>
            ))}
          </div>
          <Button className="bg-foreground text-background hover:bg-foreground/90">
            Save Changes
          </Button>
        </div>
      )}

      {activeTab === "misc" && (
        <div className="space-y-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-foreground">Grace Period</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Days before unverified users are removed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Switch checked={gracePeriod} onCheckedChange={setGracePeriod} />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-foreground">User Removal Grace Period (Days)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of days before removal</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                value={gracePeriodDays}
                onChange={(e) => setGracePeriodDays(e.target.value)}
                className="w-20 bg-background border-border"
              />
            </div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <h4 className="font-medium text-foreground mb-2">Note:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>When enabled, new unverified users will be placed in grace period</li>
              <li>Users automatically exit grace period upon email verification or activity</li>
              <li>Removal grace period defines how many days grace period users remain before deletion</li>
            </ul>
          </div>
          <Button className="bg-foreground text-background hover:bg-foreground/90">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
