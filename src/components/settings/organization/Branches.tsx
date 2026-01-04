import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ListFilter, FileDown, List, X, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { InputField } from "@/components/form/InputField";
import { StatusToggle } from "@/components/form/Status";
import { SelectField } from "@/components/form/SelectField";
import { Badge } from "@/components/ui/badge"

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
  status: "Active" | "Disabled";
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
    { name: "UAE Branch", code: "UAE", users: 2, staff: 0, status: "Active" },
    { name: "USA Branch", code: "USA", users: 0, staff: 1, status: "Active" },
    { name: "Test Branch", code: "UK", users: 2, staff: 1, status: "Active" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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

  const statusClasses: Record<string, string> = {
    Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
  };

  // Pagination calculations
  const totalItems = branches.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const paginatedData = branches.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };
  /* ------------------ Add Branch ------------------ */
  const handleAddBranch = () => {
    if (!branchName.trim() || !branchCode.trim()) {
      setError("Please fill out this field");
      return;
    }

    setBranches([
      ...branches,
      { name: branchName, code: branchCode, users: 0, staff: 0, status: isActive ? "Active" : "Disabled" },
    ]);

    setOpenAddModal(false);
    resetForm();
  };

  /* ------------------ Update Branch ------------------ */
  const handleOpenUpdateModal = (index: number) => {
    const branch = branches[index];
    setBranchName(branch.name);
    setBranchCode(branch.code);
    setIsActive(branch.status === "Active");
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
        status: isActive ? "Active" : "Disabled",
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
        <Input className="w-full md:w-auto" placeholder="Search Branch Name, Code..." />
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

            <thead className="bg-muted/60 text-sm">
              <tr>
                <th className="px-3 py-4">BRANCH NAME</th>
                <th className="px-3 py-4">CODE</th>
                <th className="px-3 py-4">USERS</th>
                <th className="px-3 py-4">STAFF</th>
                <th className="px-3 py-4">STATUS</th>
                <th className="px-3 py-4 ">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((branch, index) => (
                <tr key={index} className="border-t border-border hover:bg-muted/30 ">
                  <td className="p-3">{branch.name}</td>
                  <td className="p-3">{branch.code}</td>
                  <td className="p-3">{branch.users}</td>
                  <td className="p-3">{branch.staff}</td>
                  <td className="p-3">
                    <Badge
                      variant="outline"
                      className={`${statusClasses[branch.status]} rounded-md px-2 py-0.5`}
                    >
                      {branch.status}
                    </Badge>
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
                    <Button size="icon" variant="destructive" onClick={() => setOpenDeleteModal(true)}>
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
      {/* ================= VIEW MODAL ================= */}
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

            <div className="rounded-xl bg-white/5 p-8 space-y-6">

              {/* Countries */}
              <div>

                <div className="relative">
                  {/* Label */}
                  <label className="flex items-center gap-2 text-white mb-2">
                    Countries

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
                onClick={addField} >
                Add Field Option
              </Button>

              {fields.map((field, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  {/* Field Label */}
                  <div className="md:col-span-4">
                    <InputField
                      label="Field Label"
                      placeholder="Enter field label"
                      value={field.label}
                      onChange={(e) => {
                        const copy = [...fields];
                        copy[index].label = e.target.value;
                        setFields(copy);
                      }}
                      className="bg-black/40 text-white"
                    />
                  </div>

                  {/* Field Type */}
                  <div className="md:col-span-4">
                    <SelectField
                      label="Field Type"
                      value={field.type}
                      onChange={(value) => {
                        const copy = [...fields];
                        copy[index].type = value;
                        setFields(copy);
                      }}
                      options={[
                        { label: "Input Text", value: "text" },
                        { label: "Checkbox", value: "checkbox" },
                        { label: "Radio", value: "radio" },
                        { label: "Date", value: "date" },
                        { label: "Dropdown", value: "dropdown" },
                      ]}
                    />
                  </div>

                  {/* Required */}
                  <div className="md:col-span-3">
                    <SelectField
                      label="Required"
                      value={field.required ? "yes" : "no"}
                      onChange={(value) => {
                        const copy = [...fields];
                        copy[index].required = value === "yes";
                        setFields(copy);
                      }}
                      options={[
                        { label: "Required", value: "yes" },
                        { label: "Optional", value: "no" },
                      ]}
                    />
                  </div>

                  {/* Delete */}
                  <Button
                    size="icon"
                    variant="destructive"
                    className="mt-6"
                    onClick={() => removeField(index)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}

              {/* Status */}
              <div>
                <StatusToggle
                  label="Status"
                  status={isActive ? "Active" : "Disabled"}
                  onChange={(s) => setIsActive(s === "Active")}
                  tooltip="Enable or disable this branch form"
                />
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
      <div className="w-full max-w-md rounded-xl bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button
            size="icon"
            variant="ghost"

            onClick={onClose}
          >
            <X size={18} />
          </Button>
        </div>
        <div className="space-y-4">
          <InputField
            label="Branch Name"
            placeholder="Enter branch name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            tooltip="Enter the department name"

            error={error}

          />

          <InputField
            label="Branch Code"
            placeholder="Enter Branch Code"
            type="email"
            value={branchCode}
            onChange={(e) => setBranchCode(e.target.value)}
            tooltip="Enter the Branch name"
          />

          <StatusToggle
            label="Status"
            status={isActive ? "Active" : "Disabled"}
            onChange={(s) => setIsActive(s === "Active")}
            tooltip=""
          />

        </div>

        <div className="flex justify-end gap-3 py-4 ">
          <Button variant="destructive" onClick={onClose}>
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
