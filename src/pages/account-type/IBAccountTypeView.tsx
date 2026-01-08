import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Eye, Pencil, Trash2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { AddLevelModal } from "./AddLevelModal";

interface LevelData {
  id: number;
  title: string;
  levelOrder: number;
  status: string;
}

const mockSwapBasedLevels: LevelData[] = [];
const mockSwapFreeLevels: LevelData[] = [];

export function IBAccountTypeView() {
  const navigate = useNavigate();
  const [enableSwapFree, setEnableSwapFree] = useState(true);
  const [addLevelModal, setAddLevelModal] = useState<{ open: boolean; type: "swap-based" | "swap-free" }>({
    open: false,
    type: "swap-based",
  });

  const handleOpenAddLevel = (type: "swap-based" | "swap-free") => {
    setAddLevelModal({ open: true, type });
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/account-type/ib-account-type")}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Standard</h1>
        </div>

        {/* Platform Settings Card */}
        <div className="bg-card rounded-lg border border-border p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Platform Group (Default) */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-sm font-medium text-foreground">
                  Platform Group (Default)
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Default platform group for this account type</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                value="real\test1"
                readOnly
                className="bg-muted/50 border-border"
              />
            </div>

            {/* Trading Server (Live) */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-sm font-medium text-foreground">
                  Trading Server (Live)
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Live trading server for this account type</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select defaultValue="mbfxglobal">
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select server" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mbfxglobal">MBFXGlobal-Server</SelectItem>
                  <SelectItem value="server2">Server 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Enable Swap Free Toggle */}
          <div className="flex items-center gap-3">
            <Switch
              checked={enableSwapFree}
              onCheckedChange={setEnableSwapFree}
            />
            <div className="flex items-center gap-1">
              <span className="text-sm text-foreground">
                Enable Separate Swap-Free (Islamic)
              </span>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enable Islamic swap-free account option</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Platform Group - Swap Free */}
          {enableSwapFree && (
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-sm font-medium text-foreground">
                  Platform Group - Swap Free
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Platform group for swap-free accounts</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                value="real\test\1"
                readOnly
                className="bg-muted/50 border-border"
              />
            </div>
          )}
        </div>

        {/* Account Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Swap Based Accounts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h2 className="text-base font-medium text-foreground">
                  Swap Based Accounts
                </h2>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Manage swap-based account levels</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Button
                onClick={() => handleOpenAddLevel("swap-based")}
                className="bg-primary text-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Level
              </Button>
            </div>

            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase">ID</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase">Title</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase">Level Order</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase">Status</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSwapBasedLevels.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No levels found
                      </TableCell>
                    </TableRow>
                  ) : (
                    mockSwapBasedLevels.map((level) => (
                      <TableRow key={level.id} className="hover:bg-muted/30">
                        <TableCell className="text-sm text-foreground">{level.id}</TableCell>
                        <TableCell className="text-sm text-foreground">{level.title}</TableCell>
                        <TableCell className="text-sm text-foreground">{level.levelOrder}</TableCell>
                        <TableCell className="text-sm text-foreground">{level.status}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Swap Free Accounts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-foreground">
                Swap Free Accounts
              </h2>
              <Button
                onClick={() => handleOpenAddLevel("swap-free")}
                className="bg-primary text-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Level
              </Button>
            </div>

            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase">ID</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase">Title</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase">Level Order</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase">Status</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSwapFreeLevels.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No levels found
                      </TableCell>
                    </TableRow>
                  ) : (
                    mockSwapFreeLevels.map((level) => (
                      <TableRow key={level.id} className="hover:bg-muted/30">
                        <TableCell className="text-sm text-foreground">{level.id}</TableCell>
                        <TableCell className="text-sm text-foreground">{level.title}</TableCell>
                        <TableCell className="text-sm text-foreground">{level.levelOrder}</TableCell>
                        <TableCell className="text-sm text-foreground">{level.status}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Add Level Modal */}
        <AddLevelModal
          open={addLevelModal.open}
          onOpenChange={(open) => setAddLevelModal({ ...addLevelModal, open })}
          type={addLevelModal.type}
        />
      </div>
    </TooltipProvider>
  );
}
