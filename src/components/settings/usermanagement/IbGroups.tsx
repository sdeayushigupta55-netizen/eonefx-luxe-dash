import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ListFilter, FileDown, List } from "lucide-react";

interface IBGroupstype {
  name: string;
  code: string;
  users: number;
  staff: number;
  isActive: boolean;
}
const statusClasses = {
    Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Inactive: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
  };
export default function IBGroups() {
  const [ibGroups, setIBGroups] = useState<IBGroupstype[]>([
    { name: "UAE Branch", code: "UAE", users: 2, staff: 0, isActive: true },
    { name: "USA Branch", code: "USA", users: 0, staff: 1, isActive: true },
    { name: "Test", code: "UK", users: 2, staff: 1, isActive: false },
  ]);

  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [branchName, setBranchName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  // Open Add Branch modal
  const openAddModal = () => {
    setBranchName("");
    setBranchCode("");
    setIsActive(true);
    setError("");
    setEditIndex(null);
    setAddModalOpen(true);
  };

  // Open Update Branch modal
  const handleOpenUpdateModal = (index: number) => {
    const branch = ibGroups[index];
    setBranchName(branch.name);
    setBranchCode(branch.code);
    setIsActive(branch.isActive);
    setEditIndex(index);
    setError("");
    setUpdateModalOpen(true);
  };

  // Add new branch
  const handleAddBranch = () => {
    if (!branchName.trim() || !branchCode.trim()) {
      setError("Please fill out this field");
      return;
    }

    const newBranch: IBGroupstype = { name: branchName, code: branchCode, users: 0, staff: 0, isActive };
    setIBGroups([...ibGroups, newBranch]);

    setAddModalOpen(false);
    setBranchName("");
    setBranchCode("");
    setIsActive(true);
    setError("");
  };

  // Update branch
  const handleUpdateBranch = () => {
    if (!branchName.trim() || !branchCode.trim()) {
      setError("Please fill out this field");
      return;
    }

    if (editIndex !== null) {
      const updatedIBGroups = [...ibGroups];
      updatedIBGroups[editIndex] = { ...updatedIBGroups[editIndex], name: branchName, code: branchCode, isActive };
      setIBGroups(updatedIBGroups);
    }

    setUpdateModalOpen(false);
    setEditIndex(null);
    setBranchName("");
    setBranchCode("");
    setIsActive(true);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl border border-border">
        <Input placeholder="Search Branch Name, Code..." className="w-80" />
        <div className="flex ml-auto gap-3">
          <Button className="bg-primary flex gap-2 " onClick={openAddModal}>
            + Add New
          </Button>
          <Button variant="outline" className="flex gap-2">
            <ListFilter size={16} /> Filter
          </Button>
          <Button variant="outline" className="flex gap-2">
            <FileDown size={16} /> Export
          </Button>
        </div>
      </div>

      {/* Branches Table */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-3">BRANCH NAME</th>
                <th className="p-3">CODE</th>
                <th className="p-3">USERS</th>
                <th className="p-3">STAFF</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {ibGroups.map((branch, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="p-3">{branch.name}</td>
                  <td className="p-3">{branch.code}</td>
                  <td className="p-3">{branch.users}</td>
                  <td className="p-3">{branch.staff}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded text-white text-sm ${branch.isActive ? "bg-green-600" : "bg-gray-500"}`}>
                      {branch.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleOpenUpdateModal(index)}>
                      <Pencil size={14} />
                    </Button>
                    <Button size="icon" variant="outline">
                      <List size={14} />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Branch Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-2xl rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Create Branch</h2>
              <button onClick={() => setAddModalOpen(false)} className="text-xl">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-6 px-6 py-5">
              <div>
                <label className="text-sm mb-1 block">Branch Name <span className="text-red-500">*</span></label>
                <Input value={branchName} onChange={(e) => { setBranchName(e.target.value); setError(""); }} />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              <div>
                <label className="text-sm mb-1 block">Branch Code <span className="text-red-500">*</span></label>
                <Input value={branchCode} onChange={(e) => { setBranchCode(e.target.value); setError(""); }} />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <label className="text-sm">Status</label>
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`w-11 h-6 rounded-full relative transition ${isActive ? "bg-primary" : "bg-gray-400"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition ${isActive ? "translate-x-5" : ""}`} />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <Button variant="outline" onClick={() => setAddModalOpen(false)}>Cancel</Button>
              <Button onClick={handleAddBranch}>+ Create Branch</Button>
            </div>
          </div>
        </div>
      )}

      {/* Update Branch Modal */}
      {updateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-2xl rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Update Branch</h2>
              <button onClick={() => setUpdateModalOpen(false)} className="text-xl">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-6 px-6 py-5">
              <div>
                <label className="text-sm mb-1 block">Branch Name <span className="text-red-500">*</span></label>
                <Input value={branchName} onChange={(e) => { setBranchName(e.target.value); setError(""); }} />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              <div>
                <label className="text-sm mb-1 block">Branch Code <span className="text-red-500">*</span></label>
                <Input value={branchCode} onChange={(e) => { setBranchCode(e.target.value); setError(""); }} />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <label className="text-sm">Status</label>
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`w-11 h-6 rounded-full relative transition ${isActive ? "bg-primary" : "bg-gray-400"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition ${isActive ? "translate-x-5" : ""}`} />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <Button variant="outline" onClick={() => setUpdateModalOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdateBranch}>Update Branch</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
