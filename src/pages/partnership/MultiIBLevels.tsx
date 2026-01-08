import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Check, X, AlertTriangle } from "lucide-react";
import { mockMultiIBLevels, MultiIBLevel } from "./partnershipData";
import { toast } from "sonner";

const MultiIBLevels = () => {
  const [levels, setLevels] = useState<MultiIBLevel[]>(mockMultiIBLevels);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<MultiIBLevel | null>(null);
  const [formTitle, setFormTitle] = useState("");

  const handleAddNew = () => {
    setFormTitle("");
    setIsAddModalOpen(true);
  };

  const handleEdit = (level: MultiIBLevel) => {
    setSelectedLevel(level);
    setFormTitle(level.title);
    setIsEditModalOpen(true);
  };

  const handleDelete = (level: MultiIBLevel) => {
    setSelectedLevel(level);
    setIsDeleteModalOpen(true);
  };

  const handleSaveNew = () => {
    if (!formTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }
    const newLevel: MultiIBLevel = {
      id: String(levels.length + 1),
      title: formTitle,
      levelOrder: levels.length + 1,
    };
    setLevels([...levels, newLevel]);
    setIsAddModalOpen(false);
    toast.success("Level added successfully");
  };

  const handleSaveEdit = () => {
    if (!formTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }
    setLevels(
      levels.map((l) =>
        l.id === selectedLevel?.id ? { ...l, title: formTitle } : l
      )
    );
    setIsEditModalOpen(false);
    toast.success("Level updated successfully");
  };

  const handleConfirmDelete = () => {
    setLevels(levels.filter((l) => l.id !== selectedLevel?.id));
    setIsDeleteModalOpen(false);
    toast.success("Level deleted successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Levels</h1>
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">
                  TITLE
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  LEVEL ORDER
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  ACTION
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {levels.map((level) => (
                <TableRow
                  key={level.id}
                  className="border-border hover:bg-muted/50"
                >
                  <TableCell className="text-foreground font-medium">
                    {level.title}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {level.levelOrder}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleEdit(level)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(level)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-4 border-t border-border text-sm text-muted-foreground">
            Showing 1 to {levels.length} of {levels.length} results
          </div>
        </div>
      </div>

      {/* Add New Level Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Level</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-1">
                Title
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">
                  i
                </span>
              </Label>
              <Input
                id="title"
                placeholder="Enter Level Title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              onClick={handleSaveNew}
              className="gap-2 bg-slate-800 hover:bg-slate-700"
            >
              <Check className="h-4 w-4" />
              Save Level
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsAddModalOpen(false)}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Level Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Levels</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="flex items-center gap-1">
                Title
                <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">
                  i
                </span>
              </Label>
              <Input
                id="edit-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              onClick={handleSaveEdit}
              className="gap-2 bg-slate-800 hover:bg-slate-700"
            >
              <Check className="h-4 w-4" />
              Save Changes
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsEditModalOpen(false)}
              className="gap-2"
            >
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
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Are You Sure?
            </h2>
            <p className="text-muted-foreground text-center">
              You want to delete the level{" "}
              <span className="font-semibold text-foreground">
                {selectedLevel?.title}
              </span>
              ?
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <Button
              onClick={handleConfirmDelete}
              className="gap-2 bg-slate-800 hover:bg-slate-700"
            >
              <Check className="h-4 w-4" />
              Confirm
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteModalOpen(false)}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default MultiIBLevels;
