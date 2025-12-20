import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";


interface SystemTagstype {
  name: string;
  parent: string;
  status: string;
}

export default function SystemTags() {
  const [rows, setRows] = useState<SystemTagstype[]>([
    { name: "Sales Dept", parent: "-", status: "Active" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // null means add new
  const [newName, setNewName] = useState("");
  const [newParent, setNewParent] = useState("");
  const [newStatus, setNewStatus] = useState(true);
  const [error, setError] = useState("");

  const statusClasses = {
    Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Inactive: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
  };

  // Open modal for adding new department
  const openAddModal = () => {
    setEditIndex(null);
    setNewName("");
    setNewParent("");
    setNewStatus(true);
    setError("");
    setModalOpen(true);
  };

  // Open modal for editing department
  const openEditModal = (index: number) => {
    const dept = rows[index];
    setEditIndex(index);
    setNewName(dept.name);
    setNewParent(dept.parent === "-" ? "" : dept.parent);
    setNewStatus(dept.status === "Active");
    setError("");
    setModalOpen(true);
  };

  const handleSaveDepartment = () => {
    if (!newName.trim()) {
      setError("Please fill out the department name");
      return;
    }

    const updatedDepartment: SystemTagstype = {
      name: newName,
      parent: newParent || "-",
      status: newStatus ? "Active" : "Inactive",
    };

    if (editIndex !== null) {
      // Update existing department
      const updatedRows = [...rows];
      updatedRows[editIndex] = updatedDepartment;
      setRows(updatedRows);
    } else {
      // Add new department
      setRows([...rows, updatedDepartment]);
    }

    setModalOpen(false);
    setEditIndex(null);
    setNewName("");
    setNewParent("");
    setNewStatus(true);
    setError("");
  };

  const handleDelete = (index: number) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  return (
    <div className="rounded-lg shadow-sm space-y-4">
      {/* Add Department Button */}
      <div className="flex justify-end">
        <Button onClick={openAddModal} className="bg-primary flex gap-2 text-white" >+ Add New</Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th className="p-3">NAME</th>
                <th className="p-3">PARENT</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-t border-gray-700">
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
                    <Button size="icon" variant="outline" onClick={() => handleDelete(index)}>
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-xl bg-card border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editIndex !== null ? "Update Department" : "Add Department"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm block mb-1">
                  Department Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={newName}
                  onChange={(e) => { setNewName(e.target.value); setError(""); }}
                />
              </div>

              <div>
                <label className="text-sm block mb-1">Parent Department</label>
                <Input
                  value={newParent}
                  onChange={(e) => setNewParent(e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="flex items-center gap-2">
                <span>Status</span>
                <Button
                  className={`${newStatus ? "bg-green-600" : "bg-gray-400"} w-12 h-6 rounded-full relative`}
                  onClick={() => setNewStatus(!newStatus)}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition ${
                      newStatus ? "translate-x-6" : ""
                    }`}
                  />
                </Button>
                <span>{newStatus ? "Active" : "Inactive"}</span>
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveDepartment}>
                {editIndex !== null ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
