import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, X, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  
  TooltipProvider,
 
} from "@/components/ui/tooltip";
import { InputField } from "@/components/form/InputField";

import { StatusToggle } from "@/components/form/Status";

interface SystemTagstype {
  name: string;
  details: string;
  status: "Active" | "Disabled";
}

interface SystemTagsProps {
  openAddModal: boolean;
  setOpenAddModal: (v: boolean) => void;
}

export default function SystemTags({ openAddModal, setOpenAddModal }: SystemTagsProps) {
  const [rows, setRows] = useState<SystemTagstype[]>([
    {
      name: "Suspicious",
      details:
        "Unusual trading patterns or activities that could indicate potential market manipulation.",
      status: "Active",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  const statusClasses: Record<string, string> = {
    Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
  };

  /* OPEN ADD MODAL */
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
    setDetails(d.details);
    setIsActive(d.status === "Active");
    setModalOpen(true);

  };

  /* SAVE */
  const handleSave = () => {
    if (!name.trim()) {
      setError("Department name is required");
      return;
    }

    const payload: SystemTagstype = {
      name,
      details,
      status: isActive ? "Active" : "Disabled",
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
    if (activeIndex !== null) {
      setRows(rows.filter((_, i) => i !== activeIndex));
    }
    setActiveIndex(null);
    setDeleteModalOpen(false);
  };

  /* RESET FORM */
  const resetForm = () => {
    setEditIndex(null);
    setName("");
    setDetails("");
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
              <thead className="bg-muted/60 text-sm">
                <tr>
                  <th className="px-3 py-4">TAG NAME</th>

                  <th className="px-3 py-4">STATUS</th>
                  <th className="px-3 py-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="p-3">{row.name}</td>

                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={`${statusClasses[row.status]} rounded-md px-2 py-0.5`}
                      >
                        {row.status}
                      </Badge>
                    </td>
                    <td className="p-3 flex flex-wrap gap-2">
                      <Button size="icon" variant="outline" onClick={() => openEditModal(index)}>
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => {
                          setActiveIndex(index);
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

        {/* ADD / EDIT MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-xl bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {editIndex !== null ? "Update System Tag" : "Add New System Tag"}
                </h2>
                <Button size="icon" variant="ghost" onClick={closeModal}>
                  <X size={18} />
                </Button>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  tooltip="Enter the System Tag name"
                  placeholder="System Tag Name"
                  error={error}
                />
                <InputField
                  label="Details (optional)"
                  type="textarea"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  tooltip="Optional description of the System Tag"
                  placeholder="Details about the System Tag"
                />
                <StatusToggle
                  label="Status"
                  status={isActive ? "Active" : "Disabled"}
                  onChange={(s) => setIsActive(s === "Active")}
                  tooltip="Enable or disable this tag"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="destructive" onClick={closeModal}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>{editIndex !== null ? "Update" : "Add"}</Button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRM MODAL */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md rounded-xl bg-card border border-border p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900/30">
                <Trash2 className="text-red-500" size={28} />
              </div>

              <h2 className="text-2xl font-semibold mb-2">Are You Sure?</h2>
              <p className="mb-8">
                You want to delete <strong>{rows[activeIndex!]?.name}</strong> System Tag?</p>

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={confirmDelete}>
                  Confirm
                </Button>
                <Button variant="destructive" className="px-6" onClick={() => setDeleteModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
