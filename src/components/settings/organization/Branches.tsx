import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ListFilter, FileDown, List ,X,Info} from "lucide-react";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface Branch {
  name: string;
  code: string;
  users: number;
  staff: number;
  isActive: boolean;
}

interface BranchesProps {
  openAddModal: boolean;
  setOpenAddModal: (v: boolean) => void;
}
const ALL_COUNTRIES = [
  "India",
  "UAE",
  "USA",
  "UK",
  "Germany",
  "France",
  "Australia",
  "Canada",
];
export default function Branches({
  openAddModal,
  setOpenAddModal,
}: BranchesProps) {
  const [branches, setBranches] = useState<Branch[]>([
    { name: "UAE Branch", code: "UAE", users: 2, staff: 0, isActive: true },
    { name: "USA Branch", code: "USA", users: 0, staff: 1, isActive: true },
    { name: "Test Branch", code: "UK", users: 2, staff: 1, isActive: true },
  ]);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [branchName, setBranchName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");
   const [openViewModal, setOpenViewModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [countries, setCountries] = useState<string[]>([]);
const [openCountryDropdown, setOpenCountryDropdown] = useState(false);


  /* ------------------ Add Branch ------------------ */
  const handleAddBranch = () => {
    if (!branchName.trim() || !branchCode.trim()) {
      setError("Please fill out this field");
      return;
    }

    setBranches([
      ...branches,
      { name: branchName, code: branchCode, users: 0, staff: 0, isActive },
    ]);

    setOpenAddModal(false);
    resetForm();
  };

  /* ------------------ Update Branch ------------------ */
  const handleOpenUpdateModal = (index: number) => {
    const branch = branches[index];
    setBranchName(branch.name);
    setBranchCode(branch.code);
    setIsActive(branch.isActive);
    setEditIndex(index);
    setUpdateModalOpen(true);
  };

  const handleUpdateBranch = () => {
    if (!branchName.trim() || !branchCode.trim()) {
      setError("Please fill out this field");
      return;
    }

    if (editIndex !== null) {
      const updated = [...branches];
      updated[editIndex] = {
        ...updated[editIndex],
        name: branchName,
        code: branchCode,
        isActive,
      };
      setBranches(updated);
    }

    setUpdateModalOpen(false);
    resetForm();
  };

  /* ------------------ Helpers ------------------ */
  const resetForm = () => {
    setBranchName("");
    setBranchCode("");
    setIsActive(true);
    setError("");
    setEditIndex(null);
  };
  
  const [fields, setFields] = useState<
    { label: string; type: string; required: boolean }[]
  >([]);

  const addField = () => {
    setFields([
      ...fields,
      { label: "", type: "text", required: true },
    ]);
  };

  const removeField = (index: number) => {
    const copy = [...fields];
    copy.splice(index, 1);
    setFields(copy);
  };
  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".relative")) {
      setOpenCountryDropdown(false);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  /* ------------------ UI ------------------ */
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
        <Input className="w-full md:w-auto" placeholder="Search Branch Name, Code..."/>
        <select className="bg-background border border-border rounded-md px-3 py-2 w-full md:w-80">

                  <option>All Status</option>
                  <option>Active</option>
                  <option>Diasable</option>
                </select>
             
        <div className="flex flex-col sm:flex-row gap-3 md:ml-auto w-full md:w-auto">

          <Button variant="outline">
            <ListFilter size={16} /> Filter
          </Button>
          <Button variant="outline">
            <FileDown size={16} /> Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
  <CardContent className="p-0 overflow-x-auto">
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
              {branches.map((branch, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{branch.name}</td>
                  <td className="p-3">{branch.code}</td>
                  <td className="p-3">{branch.users}</td>
                  <td className="p-3">{branch.staff}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded text-sm text-white ${
                        branch.isActive ? "bg-green-600" : "bg-gray-500"
                      }`}
                    >
                      {branch.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                 <td className="p-3 flex flex-wrap gap-2">

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleOpenUpdateModal(index)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => setOpenViewModal(true)}>
                      <List size={14} />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => setOpenDeleteModal(true)}>
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
      {openAddModal && (
        <Modal
          title="Create Branch"
          onClose={() => setOpenAddModal(false)}
          onSubmit={handleAddBranch}
          branchName={branchName}
          setBranchName={setBranchName}
          branchCode={branchCode}
          setBranchCode={setBranchCode}
          isActive={isActive}
          setIsActive={setIsActive}
          error={error}
        />
      )}

      {/* Update Branch Modal */}
      {updateModalOpen && (
        <Modal
          title="Update Branch"
          onClose={() => setUpdateModalOpen(false)}
          onSubmit={handleUpdateBranch}
          branchName={branchName}
          setBranchName={setBranchName}
          branchCode={branchCode}
          setBranchCode={setBranchCode}
          isActive={isActive}
          setIsActive={setIsActive}
          error={error}
          
        />
      )}
     
     <Dialog open={openViewModal} onOpenChange={setOpenViewModal}>
      <DialogContent className="w-[95%] max-w-5xl p-0 overflow-hidden">

        {/* Header (NO BACK BUTTON) */}
        <div className="px-6 py-4 ">
          <h2 className="text-xl font-semibold text-white">
            Branch Form — UAE Branch
          </h2>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">

          <div className="rounded-xl bg-white/5 p-6 space-y-6">

            {/* Countries */}
            <div>
             
<div className="relative">
  {/* Label */}
  <label className="flex items-center gap-2 text-sm text-white mb-2">
  Countries <span className="text-red-500">*</span>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info size={14} className="cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent side="right">
        Select one or more country for this table
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</label>

  {/* Dropdown Trigger */}
  <div
    onClick={() => setOpenCountryDropdown(!openCountryDropdown)}
    className="w-full cursor-pointer rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white flex flex-wrap gap-2 min-h-[48px]"
  >
    {countries.length === 0 ? (
      <span className="text-gray-400">Select Countries</span>
    ) : (
      countries.map((c) => (
        <span
          key={c}
          className="bg-blue-600/20 border  border-blue-500/40 px-2 py-1 rounded text-xs"
        >
          {c}
        </span>
      ))
    )}
  </div>

  {/* Dropdown Menu */}
  {openCountryDropdown && (
    <div className="z-50 mt-2 mb-3 w-full rounded-lg border border-white/10 bg-black shadow-xl max-h-56 overflow-auto">
      {ALL_COUNTRIES.map((country) => (
        <label
          key={country}
          className="flex items-center gap-3 px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={countries.includes(country)}
            onChange={() => {
              if (countries.includes(country)) {
                setCountries(countries.filter((c) => c !== country));
              } else {
                setCountries([...countries, country]);
              }
            }}
           className="accent-blue-600"
          />
          {country}
        </label>
      ))}
    </div>
  )}
</div>

            </div>

            {/* Add Field Option */}
            <Button
              onClick={addField}
              
            >
              Add Field Option
            </Button>

            {/* Dynamic Fields */}
            {fields.map((field, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                
                {/* Label */}
                <Input
                  placeholder="Field label"
                  value={field.label}
                  onChange={(e) => {
                    const copy = [...fields];
                    copy[index].label = e.target.value;
                    setFields(copy);
                  }}
                  className="md:col-span-4 bg-black/40 text-white"
                />

                {/* Field Type */}
                <select
                  value={field.type}
                  onChange={(e) => {
                    const copy = [...fields];
                    copy[index].type = e.target.value;
                    setFields(copy);
                  }}
                  className="md:col-span-4 rounded-lg bg-black/40border border-white/10 px-4 py-3 text-white"
                >
                  <option value="text">Input Text</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Radio</option>
                  <option value="date">Date</option>
                  <option value="dropdown">Dropdown</option>
                </select>

                {/* Required */}
                <select
                  value={field.required ? "yes" : "no"}
                  onChange={(e) => {
                    const copy = [...fields];
                    copy[index].required = e.target.value === "yes";
                    setFields(copy);
                  }}
                  className="md:col-span-3 rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white"
                >
                  <option value="yes">Required</option>
                  <option value="no">Optional</option>
                </select>

                {/* Delete */}
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => removeField(index)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
            {/* Status */}
        <div className="flex items-center gap-4">
          <span className="text-white text-sm">Status</span>
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
        </div>

            {/* Save */}
            <div className="flex justify-end">
              <Button className=" px-8 py-3">
                Save Form
              </Button>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>


        {/* ================= DELETE MODAL ================= */}
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent className="w-[90%] max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Delete Branch
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p>
              Are you sure you want to delete <strong>"UAE Branch"</strong>?
            </p>

            <div className="rounded border p-4 text-red-600 bg-red-50">
              <p className="font-semibold">
                This branch cannot be deleted because:
              </p>
              <ul className="mt-2 list-disc list-inside text-sm">
                <li>2 user(s) are assigned to this branch</li>
              </ul>
              <p className="mt-2 text-sm">
                Please reassign users and staff before deleting this branch.
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              This action cannot be undone.
            </p>
          </div>

          <DialogFooter className="flex justify-center gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ------------------ Reusable Modal ------------------ */
function Modal({
  title,
  onClose,
  onSubmit,
  branchName,
  setBranchName,
  branchCode,
  setBranchCode,
  isActive,
  setIsActive,
  error,
}: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-2xl bg-card rounded-xl border">
        <div className="flex justify-between px-6 py-4 border-b">
          <h2 className="font-semibold">{title}</h2>
           <Button
                  size="icon"
                  variant="ghost"
                  
                  onClick={onClose}
                >
                  <X size={18} />
                </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 py-5">
          <div>
            <label className="text-sm">Branch Name *</label>
            <Input
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>

          <div>
            <label className="text-sm">Branch Code *</label>
            <Input
              value={branchCode}
              onChange={(e) => setBranchCode(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>

          <div className="col-span-2 flex items-center gap-3">
            <label>Status</label>
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
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            {title === "Create Branch" ? "Create Branch" : "Update Branch"}
          </Button>
        </div>
      </div>
    </div>
  );
}
