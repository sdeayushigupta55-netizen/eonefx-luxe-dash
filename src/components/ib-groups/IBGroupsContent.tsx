import { useState } from "react";
import { Search, Filter, Download, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { ibGroupsData, ibGroupsTabs, IBGroup } from "./ibGroupsData";
import { AddIBGroupModal } from "./AddIBGroupModal";
import { EditIBGroupModal } from "./EditIBGroupModal";
import { DeleteIBGroupModal } from "./DeleteIBGroupModal";
import { cn } from "@/lib/utils";

export function IBGroupsContent() {
  const [activeTab, setActiveTab] = useState("ib-groups");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<IBGroup | null>(null);
  const [groups, setGroups] = useState(ibGroupsData);

  const handleAddGroup = (data: {
    name: string;
    details: string;
    rebateRules: string[];
    status: boolean;
    globalAccount: boolean;
  }) => {
    const newGroup: IBGroup = {
      id: String(groups.length + 1),
      groupName: data.name,
      rebateRules: data.rebateRules,
      accountTypes: ["Promo Account", "Standard"],
      globalAccountType: data.globalAccount ? "Active" : "Disabled",
      status: data.status ? "Active" : "Disabled",
    };
    setGroups([...groups, newGroup]);
  };

  const handleEditGroup = (updatedGroup: IBGroup) => {
    setGroups(groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)));
  };

  const handleDeleteGroup = () => {
    if (selectedGroup) {
      setGroups(groups.filter((g) => g.id !== selectedGroup.id));
      setIsDeleteModalOpen(false);
      setSelectedGroup(null);
    }
  };

  const openEditModal = (group: IBGroup) => {
    setSelectedGroup(group);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (group: IBGroup) => {
    setSelectedGroup(group);
    setIsDeleteModalOpen(true);
  };

  const filteredGroups = groups.filter((group) =>
    group.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">IB Groups</h1>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {ibGroupsTabs.map((tab) => (
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

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Group Name, Rebate Rule, Account Type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/30 border-border"
          />
        </div>
        <Select defaultValue="all-status">
          <SelectTrigger className="w-[150px] bg-muted/30 border-border">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-types">
          <SelectTrigger className="w-[200px] bg-muted/30 border-border">
            <SelectValue placeholder="All Global Account Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All Global Account Types</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2 border-border">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="gap-2 border-border">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Table */}
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
            {filteredGroups.map((group) => (
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
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs",
                      group.globalAccountType === "Active"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    )}
                  >
                    {group.globalAccountType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-500/20 text-emerald-400 text-xs"
                  >
                    {group.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => openEditModal(group)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => openDeleteModal(group)}
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

      {/* Modals */}
      <AddIBGroupModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddGroup}
      />
      <EditIBGroupModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedGroup(null);
        }}
        onSave={handleEditGroup}
        group={selectedGroup}
      />
      <DeleteIBGroupModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedGroup(null);
        }}
        onConfirm={handleDeleteGroup}
        group={selectedGroup}
      />
    </div>
  );
}
