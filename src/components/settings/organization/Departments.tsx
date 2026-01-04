import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {TooltipProvider} from "@/components/ui/tooltip";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { StatusToggle } from "@/components/form/Status";

interface DepartmentType {
  email: string;
  name: string;
  parent: string;
  status: "Active" | "Disabled";
}

interface DepartmentsProps {
  openAddModal: boolean;
  setOpenAddModal: (v: boolean) => void;
}
const statusClasses: Record<string, string> = {
  Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};
export default function Departments({ openAddModal, setOpenAddModal }: DepartmentsProps) {
  const [rows, setRows] = useState<DepartmentType[]>([
    { name: "Sales Dept", parent: "-", status: "Active", email: "" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [email, setEmail] = useState("");
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

  useEffect(() => {
    if (openAddModal) {
      resetForm();
      setModalOpen(true);
    }
  }, [openAddModal]);

  const openEditModal = (index: number) => {
    const d = rows[index];
    setEditIndex(index);
    setName(d.name);
    setParent(d.parent === "-" ? "" : d.parent);
    setEmail(d.email || "");
    setIsActive(d.status === "Active");
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name.trim()) {
      setError("Department name is required");
      return;
    }

    const payload: DepartmentType = {
      name,
      parent: parent || "-",
      email,
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

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      setRows(rows.filter((_, i) => i !== deleteIndex));
    }
    setDeleteIndex(null);
    setDeleteModalOpen(false);
  };

  const resetForm = () => {
    setEditIndex(null);
    setName("");
    setParent("");
    setEmail("");
    setIsActive(true);
    setError("");
  };

  const closeModal = () => {
    setModalOpen(false);
    setOpenAddModal(false);
    resetForm();
  };

  const parentOptions = [{ label: "Sales Dept", value: "sales-dept" }];

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* TABLE */}
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="px-3 py-4">NAME</th>
                  <th className="px-3 py-4">PARENT</th>
                  <th className="px-3 py-4">STATUS</th>
                  <th className="px-3 py-4">ACTION</th>
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
                      <Button size="icon" variant="outline" onClick={() => openEditModal(index)}>
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

        {/* ADD / EDIT MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-xl bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {editIndex !== null ? "Update Department" : "Add Department"}
                </h2>
                <Button size="icon" variant="ghost" onClick={closeModal}>
                  <X size={18} />
                </Button>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Name"
                  placeholder="Department Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  tooltip="Enter the department name"
                  required
                  error={error}

                />
                <SelectField
                  label="Parent"
                  value={parent}
                  onChange={setParent}
                  placeholder="Select Parent"
                  tooltip="Select a parent department, if applicable"
                  options={parentOptions}
                />
                <InputField
                  label="Email"
                  placeholder="Department Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  tooltip="Email used for department communication"
                />

                <StatusToggle
                  label="Hide From Client"
                  status={isActive ? "Active" : "Disabled"}
                  onChange={(s) => setIsActive(s === "Active")}
                  tooltip="Toggle to make this department invisible to clients"
                />

              </div>

              <div className="flex justify-end gap-3 mt-6">
                
                 <Button variant="destructive" className="px-4" onClick={closeModal}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>{editIndex !== null ? "Update" : "Add"}</Button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md rounded-xl bg-card border border-border p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900/30">
                <Trash2 className="text-red-500" size={28} />
              </div>

              <h2 className="text-2xl font-semibold mb-2">Are You Sure?</h2>
              <p className="mb-8">You want to delete this department?</p>

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={confirmDelete}>
                  Confirm
                </Button>
                <Button variant="destructive" className="px-4" onClick={() => setDeleteModalOpen(false)}>
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
