import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Check, X, AlertTriangle, Filter, Download } from "lucide-react";
import {
  mockRebateRules,
  RebateRule,
  mockSymbolGroups,
  availableAccountTypes,
  availableIBGroups,
} from "./partnershipData";
import { toast } from "sonner";

const RebateRules = () => {
  const navigate = useNavigate();
  const [rules, setRules] = useState<RebateRule[]>(mockRebateRules);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<RebateRule | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalRebateFilter, setTotalRebateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formSymbolGroups, setFormSymbolGroups] = useState<string[]>([]);
  const [formAccountTypes, setFormAccountTypes] = useState<string[]>([]);
  const [formRuleType, setFormRuleType] = useState("");
  const [formRebateAmount, setFormRebateAmount] = useState("");
  const [formPerLot, setFormPerLot] = useState("1");
  const [formStatus, setFormStatus] = useState(false);

  const handleAddNew = () => {
    setFormTitle("");
    setFormSymbolGroups([]);
    setFormAccountTypes([]);
    setFormRuleType("");
    setFormRebateAmount("");
    setFormPerLot("1");
    setFormStatus(false);
    setIsAddModalOpen(true);
  };

  const handleEdit = (rule: RebateRule) => {
    setSelectedRule(rule);
    setFormTitle(rule.name);
    setFormSymbolGroups(rule.symbolGroups);
    setFormAccountTypes(rule.accountTypes);
    setFormRuleType(rule.ruleType);
    setFormRebateAmount(String(rule.rebateAmount));
    setFormPerLot(String(rule.perLot));
    setFormStatus(rule.status);
    setIsEditModalOpen(true);
  };

  const handleDelete = (rule: RebateRule) => {
    setSelectedRule(rule);
    setIsDeleteModalOpen(true);
  };

  const handleSaveNew = () => {
    if (!formTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }
    const newRule: RebateRule = {
      id: rules.length + 1,
      name: formTitle,
      symbolGroups: formSymbolGroups,
      accountTypes: formAccountTypes,
      ibGroups: [],
      totalRebate: Number(formRebateAmount),
      status: formStatus,
      ruleType: formRuleType,
      rebateAmount: Number(formRebateAmount),
      perLot: Number(formPerLot),
    };
    setRules([...rules, newRule]);
    setIsAddModalOpen(false);
    toast.success("Rebate rule added successfully");
  };

  const handleSaveEdit = () => {
    if (!formTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }
    setRules(
      rules.map((r) =>
        r.id === selectedRule?.id
          ? {
              ...r,
              name: formTitle,
              symbolGroups: formSymbolGroups,
              accountTypes: formAccountTypes,
              ruleType: formRuleType,
              rebateAmount: Number(formRebateAmount),
              totalRebate: Number(formRebateAmount),
              perLot: Number(formPerLot),
              status: formStatus,
            }
          : r
      )
    );
    setIsEditModalOpen(false);
    toast.success("Rebate rule updated successfully");
  };

  const handleConfirmDelete = () => {
    setRules(rules.filter((r) => r.id !== selectedRule?.id));
    setIsDeleteModalOpen(false);
    toast.success("Rebate rule deleted successfully");
  };

  const toggleRuleStatus = (ruleId: number) => {
    setRules(rules.map((r) => (r.id === ruleId ? { ...r, status: !r.status } : r)));
  };

  const addSymbolGroup = (group: string) => {
    if (!formSymbolGroups.includes(group)) {
      setFormSymbolGroups([...formSymbolGroups, group]);
    }
  };

  const removeSymbolGroup = (group: string) => {
    setFormSymbolGroups(formSymbolGroups.filter((g) => g !== group));
  };

  const addAccountType = (type: string) => {
    if (!formAccountTypes.includes(type)) {
      setFormAccountTypes([...formAccountTypes, type]);
    }
  };

  const removeAccountType = (type: string) => {
    setFormAccountTypes(formAccountTypes.filter((t) => t !== type));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">All Rebate Rules</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/partnership/symbols")}>
              View All Symbols
            </Button>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Rebate Rules
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search Rebate Name, Symbol Group, Account Type, IB Group..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Input
            placeholder="Total Rebate"
            value={totalRebateFilter}
            onChange={(e) => setTotalRebateFilter(e.target.value)}
            className="w-32"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Status">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">ID ↑↓</TableHead>
                <TableHead className="text-muted-foreground font-medium">REBATE NAME</TableHead>
                <TableHead className="text-muted-foreground font-medium">SYMBOL GROUPS</TableHead>
                <TableHead className="text-muted-foreground font-medium">ACCOUNT TYPES</TableHead>
                <TableHead className="text-muted-foreground font-medium">IB GROUPS</TableHead>
                <TableHead className="text-muted-foreground font-medium">TOTAL REBATE</TableHead>
                <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
                <TableHead className="text-muted-foreground font-medium">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id} className="border-border hover:bg-muted/50">
                  <TableCell className="text-foreground">{rule.id}</TableCell>
                  <TableCell className="text-foreground font-medium">{rule.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {rule.symbolGroups.map((group) => (
                        <Badge key={group} variant="secondary" className="bg-slate-700 text-white">
                          {group}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {rule.accountTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="bg-slate-600 text-white">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {rule.ibGroups.map((group) => (
                        <Badge key={group} variant="secondary" className="bg-slate-500 text-white">
                          {group}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{rule.totalRebate}</TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.status}
                      onCheckedChange={() => toggleRuleStatus(rule.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleEdit(rule)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(rule)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Rebate Rule Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Rebate Rule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Title
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Input
                placeholder="Enter title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Select Symbol Groups
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Select onValueChange={addSymbolGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an Option" />
                </SelectTrigger>
                <SelectContent>
                  {mockSymbolGroups.filter((g) => !formSymbolGroups.includes(g.name)).map((group) => (
                    <SelectItem key={group.id} value={group.name}>{group.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {formSymbolGroups.map((group) => (
                  <Badge key={group} variant="secondary" className="bg-slate-700 text-white gap-1">
                    {group}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeSymbolGroup(group)} />
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Select Account Types
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Select onValueChange={addAccountType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an Option" />
                </SelectTrigger>
                <SelectContent>
                  {availableAccountTypes.filter((t) => !formAccountTypes.includes(t)).map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {formAccountTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="bg-slate-600 text-white gap-1">
                    {type}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeAccountType(type)} />
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Rule Type
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Select value={formRuleType} onValueChange={setFormRuleType}>
                <SelectTrigger>
                  <SelectValue placeholder="----" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Per Lot">Per Lot</SelectItem>
                  <SelectItem value="Percentage">Percentage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Rebate Amount
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Input
                placeholder="$0.00"
                value={formRebateAmount}
                onChange={(e) => setFormRebateAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Per Lot
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Input
                value={formPerLot}
                onChange={(e) => setFormPerLot(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="flex items-center gap-1">
                Status
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Switch checked={formStatus} onCheckedChange={setFormStatus} />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button onClick={handleSaveNew} className="gap-2 bg-slate-800 hover:bg-slate-700">
              <Check className="h-4 w-4" />
              Add Rebate Rule
            </Button>
            <Button variant="destructive" onClick={() => setIsAddModalOpen(false)} className="gap-2">
              <X className="h-4 w-4" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Rebate Rule Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Symbol Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Title
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Select Symbol Groups
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Select onValueChange={addSymbolGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an Option" />
                </SelectTrigger>
                <SelectContent>
                  {mockSymbolGroups.filter((g) => !formSymbolGroups.includes(g.name)).map((group) => (
                    <SelectItem key={group.id} value={group.name}>{group.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {formSymbolGroups.map((group) => (
                  <Badge key={group} variant="secondary" className="bg-slate-700 text-white gap-1">
                    {group}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeSymbolGroup(group)} />
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Select Account Types
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Select onValueChange={addAccountType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an Option" />
                </SelectTrigger>
                <SelectContent>
                  {availableAccountTypes.filter((t) => !formAccountTypes.includes(t)).map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {formAccountTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="bg-slate-600 text-white gap-1">
                    {type}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeAccountType(type)} />
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Rule Type
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Select value={formRuleType} onValueChange={setFormRuleType}>
                <SelectTrigger>
                  <SelectValue placeholder="----" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Per Lot">Per Lot</SelectItem>
                  <SelectItem value="Percentage">Percentage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Rebate Amount
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Input value={formRebateAmount} onChange={(e) => setFormRebateAmount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Per Lot
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Input value={formPerLot} onChange={(e) => setFormPerLot(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Label className="flex items-center gap-1">
                Status
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">i</span>
              </Label>
              <Switch checked={formStatus} onCheckedChange={setFormStatus} />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button onClick={handleSaveEdit} className="gap-2 bg-slate-800 hover:bg-slate-700">
              <Check className="h-4 w-4" />
              Update Rebate Rule
            </Button>
            <Button variant="destructive" onClick={() => setIsEditModalOpen(false)} className="gap-2">
              <X className="h-4 w-4" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center py-6">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Are You Sure?</h2>
            <p className="text-muted-foreground text-center">You want to delete Rebate Rule?</p>
            {selectedRule && selectedRule.ibGroups.length > 0 && (
              <div className="mt-4 w-full">
                <h3 className="font-semibold text-foreground mb-2">Attached IB Groups:</h3>
                <div className="space-y-2">
                  {selectedRule.ibGroups.map((group, index) => (
                    <div key={group} className="flex justify-between text-sm">
                      <span>{group}</span>
                      <span className="text-muted-foreground">ID: {index + 1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-destructive text-sm mt-3">
                  Please detach these groups first before deleting the rule.
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-3">
            <Button
              onClick={handleConfirmDelete}
              className={`gap-2 ${selectedRule?.ibGroups.length ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700'}`}
              disabled={selectedRule?.ibGroups.length ? true : false}
            >
              <Check className="h-4 w-4" />
              Confirm
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteModalOpen(false)} className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default RebateRules;
