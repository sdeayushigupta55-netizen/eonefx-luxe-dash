import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";



interface DesignationType {
  name: string;
  parent: string;
  status: "Active" | "Disabled";
}

interface DesignationsProps {
  openAddModal: boolean;
  setOpenAddModal: (v: boolean) => void;
}
const statusClasses: Record<string, string> = {
  Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};

export default function Designations({
  openAddModal,
  setOpenAddModal,
}: DesignationsProps) {
  const [rows, setRows] = useState<DesignationType[]>([
    { name: "Sales Manager", parent: "-", status: "Active" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  // Pagination calculations
  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const paginatedData = rows.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
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

  const parentOptions = [
    { label: "Sales Dept", value: "sales-dept" },
  ];

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
                  <th className="p-3">PARENT</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
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
                    <td className="p-3 flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => openEditModal(index)}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
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

        {/* FOOTER INFO + PAGINATION */}
        <div className="flex justify-between items-center mt-4 text-muted-foreground text-sm">
          <p>
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
            {totalItems} Entries
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>

            <span className="text-foreground">
              {currentPage} / {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

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
                <InputField
                  label="Name"
                  placeholder="Designation name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  tooltip="Enter the designation name"
                  required
                  error={error}
                />

                <SelectField
                  label="Parent"
                  value={parent}
                  onChange={setParent}
                  placeholder="Select Parent Department"
                  tooltip="Select a parent department, if applicable"
                  options={parentOptions}
                />

              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="destructive" className="px-4" onClick={closeModal}>
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
              <h2 className="text-xl font-semibold mb-2">Are You Sure?</h2>
              <p className="mb-6">You want to delete this designation?</p>

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={confirmDelete}>
                  Confirm
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteModalOpen(false)}
                >
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
