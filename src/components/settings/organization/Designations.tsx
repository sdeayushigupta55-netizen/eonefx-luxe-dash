import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, X, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DesignationType {
  name: string;
  parent: string;
  status: "Active" | "Inactive";
}

interface DesignationsProps {
  openAddModal: boolean;
  setOpenAddModal: (v: boolean) => void;
}

export default function Designations({
  openAddModal,
  setOpenAddModal,
}: DesignationsProps) {
  const [rows, setRows] = useState<DesignationType[]>([
    { name: "Sales Manager", parent: "-", status: "Active" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  const statusClasses: Record<string, string> = {
    Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Inactive: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
  };

  /* OPEN MODAL FROM PARENT */
  useEffect(() => {
    if (openAddModal) {
      resetForm();
      setModalOpen(true);
    }
  }, [openAddModal]);

  /* EDIT */
  const openEditModal = (index: number) => {
    const d = rows[index];
    setEditIndex(index);
    setName(d.name);
    setParent(d.parent === "-" ? "" : d.parent);
    setIsActive(d.status === "Active");
    setModalOpen(true);
  };

  /* SAVE */
  const handleSave = () => {
    if (!name.trim()) {
      setError("Designation name is required");
      return;
    }

    const payload: DesignationType = {
      name,
      parent: parent || "-",
      status: isActive ? "Active" : "Inactive",
    };

    if (editIndex !== null) {
      const updated = [...rows];
      updated[editIndex] = payload;
      setRows(updated);
    } else {
      setRows([...rows, payload]);
    }

    closeModal();
  };

  /* DELETE */
  const confirmDelete = () => {
    if (deleteIndex !== null) {
      setRows(rows.filter((_, i) => i !== deleteIndex));
    }
    setDeleteIndex(null);
    setDeleteModalOpen(false);
  };

  /* RESET */
  const resetForm = () => {
    setEditIndex(null);
    setName("");
    setParent("");
    setIsActive(true);
    setError("");
  };

  /* CLOSE MODAL */
  const closeModal = () => {
    setModalOpen(false);
    setOpenAddModal(false);
    resetForm();
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* TABLE */}
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-3">NAME</th>
                  <th className="p-3">PARENT CATEGORY</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="p-3">{row.name}</td>
                    <td className="p-3">{row.parent}</td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={`${statusClasses[row.status]} rounded-md px-2 py-0.5`}
                      >
                        {row.status}
                      </Badge>
                    </td>
                    <td className="p-3 flex flex-wrap gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => openEditModal(index)}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setDeleteIndex(index);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* ADD / UPDATE MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-xl bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {editIndex !== null ? "Update Designation" : "Add Designation"}
                </h2>
                <Button size="icon" variant="ghost" onClick={closeModal}>
                  <X size={18} />
                </Button>
              </div>

              <div className="space-y-4">
                {/* NAME */}
                <div>
                  <label className="text-sm block mb-1 flex items-center gap-2">
                    Designation Name <span className="text-red-500">*</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Enter the designation name.
                      </TooltipContent>
                    </Tooltip>
                  </label>

                  <Input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                  />
                </div>

                {/* PARENT */}
                <div>
                  <label className="text-sm block mb-1 flex items-center gap-2">
                    Parent Category
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Select a parent designation, if applicable.
                      </TooltipContent>
                    </Tooltip>
                  </label>

                  <Input
                    value={parent}
                    onChange={(e) => setParent(e.target.value)}
                    placeholder="Optional"
                  />
                </div>

                {/* STATUS */}
                <div className="flex items-center gap-3">
                  <span>Status</span>
                  <button
                    onClick={() => setIsActive(!isActive)}
                    className={`w-11 h-6 rounded-full relative transition ${
                      isActive ? "bg-primary" : "bg-gray-400"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition ${
                        isActive ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                  <span>{isActive ? "Active" : "Inactive"}</span>
                </div>

                {error && <p className="text-red-500 text-xs">{error}</p>}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editIndex !== null ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md rounded-xl bg-card border border-border p-8 text-center">
              <Trash2 className="mx-auto mb-4 text-red-500" size={40} />
              <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
              <p className="text-muted-foreground mb-6">
                You want to delete this designation?
              </p>

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={confirmDelete}>
                  ✓ Confirm
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  ✕ Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
