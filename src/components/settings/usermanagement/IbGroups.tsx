import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ListFilter, FileDown, X, AlertTriangle } from "lucide-react";
import { InputField } from "@/components/form/InputField";
import { StatusToggle } from "@/components/form/Status";
import RichTextEditor from "@/components/form/RichTextEditor"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { SelectField } from "@/components/form/SelectField";

interface IbGroups {
  groupname: string;
  rebaterules: string[];
  accounttypes: string[];
  globalaccounttype: "Active" | "Disabled";
  status: "Active" | "Disabled";
}

interface DeleteGroupModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  groupName: string;
  attachedUsers: { name: string; username: string; email: string }[];
  onConfirm: () => void;
}

interface IbGroupsProps {
  openAddModal: boolean;
  setOpenAddModal: (v: boolean) => void;
}

export default function IbGroups({
  openAddModal,
  setOpenAddModal,
}: IbGroupsProps) {

  const [ibGroups, setIbGroups] = useState<IbGroups[]>([
    {
      groupname: "UAE Branch",
      rebaterules: ["Standard", "Promo-Rebate"],
      accounttypes: ["Standard", "Promo Account"],
      globalaccounttype: "Active",
      status: "Active",
    },
    {
      groupname: "USA Branch",
      rebaterules: ["Standard", "Promo-Rebate"],
      accounttypes: ["Standard", "Promo Account"],
      globalaccounttype: "Active",
      status: "Active",
    },
    {
      groupname: "Test Branch",
      rebaterules: ["Standard", "Promo-Rebate"],
      accounttypes: ["Standard", "Promo Account"],
      globalaccounttype: "Active",
      status: "Active",
    },
  ]);

  const attachedUsers = [
    { name: "user brokeret", username: "user13526", email: "user@brokeret.com" },
    { name: "sufyan aslam", username: "sufyanaslam8725", email: "sufyanhashmi3021@gmail.com" },
    { name: "test new", username: "testnew3856", email: "richirj43743@gmail.com" },
  ];

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [ibgroupName, setIBgroupName] = useState("");
  const [globalaccounttype, setGlobalaccounttype] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // ✅ This must be string[] NOT Option[]
  const [rebateRules, setRebateRules] = useState<string[]>([]);

  const [disclaimer, setDisclaimer] = useState(
    "This CRM demo is provided for informational purposes only."
  );

  useEffect(() => {
    if (openAddModal) {
      setIBgroupName("");
      setRebateRules([]); // Reset to empty string array
      setGlobalaccounttype(true);
      setIsActive(true);
      setError("");
    }
  }, [openAddModal]);

  const statusClasses: Record<string, string> = {
    Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
  };

  /* ------------------ Add Branch ------------------ */
  const handleAddBranch = () => {
    if (!ibgroupName.trim()) {
      setError("Please fill out this field");
      return;
    }

    setIbGroups([
      ...ibGroups,
      { 
        groupname: ibgroupName, 
        rebaterules: [...rebateRules], // Use spread to create new array
        accounttypes: [], 
        globalaccounttype: globalaccounttype ? "Active" : "Disabled", 
        status: isActive ? "Active" : "Disabled" 
      },
    ]);

    setOpenAddModal(false);
    resetForm();
  };

  /* ------------------ Update Branch ------------------ */
  const handleOpenUpdateModal = (index: number) => {
    const branch = ibGroups[index];
    setIBgroupName(branch.groupname);
    // ✅ Direct assignment - should already be string[]
    setRebateRules([...branch.rebaterules]); // Use spread to create new array
    setGlobalaccounttype(branch.globalaccounttype === "Active");
    setIsActive(branch.status === "Active");
    setEditIndex(index);
    setUpdateModalOpen(true);
  };

  const handleUpdateBranch = () => {
    if (!ibgroupName.trim()) {
      setError("Please fill out this field");
      return;
    }

    if (editIndex !== null) {
      const updated = [...ibGroups];
      updated[editIndex] = {
        ...updated[editIndex],
        groupname: ibgroupName,
        rebaterules: [...rebateRules], // Use spread to create new array
        accounttypes: updated[editIndex].accounttypes,
        globalaccounttype: globalaccounttype ? "Active" : "Disabled",
        status: isActive ? "Active" : "Disabled",
      };
      setIbGroups(updated);
    }

    setUpdateModalOpen(false);
    resetForm();
  };

  /* ------------------ Helpers ------------------ */
  const resetForm = () => {
    setIBgroupName("");
    setRebateRules([]); // Reset to empty string array
    setGlobalaccounttype(true);
    setIsActive(true);
    setError("");
    setEditIndex(null);
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
        <Input className="w-full md:w-auto" placeholder="Search Group Name, Rebate..." />
        <select className="bg-background border border-border rounded-md px-3 py-2 w-full ">
          <option>All Status</option>
          <option>Active</option>
          <option>Disabled</option>
        </select>
        <select className="bg-background border border-border rounded-md px-3 py-2 w-full ">
          <option>All Global Account Type</option>
          <option>Active</option>
          <option>Disabled</option>
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
                <th className="px-3 py-4">GROUP NAME</th>
                <th className="px-3 py-4">REBATE RULES</th>
                <th className="px-3 py-4">ACCOUNT TYPES</th>
                <th className="px-3 py-4">GLOBAL ACCOUNT TYPES</th>
                <th className="px-3 py-4">STATUS</th>
                <th className="px-3 py-4 ">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {ibGroups.map((ibgroup, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="p-3">{ibgroup.groupname}</td>
                  <td className="p-3">
                    <div className="inline-flex flex-wrap gap-2">
                      {ibgroup.rebaterules.map((rule, i) => (
                        <Badge key={i} variant="outline" className="rounded-md px-2 py-0.5 border border-border">
                          {rule}
                        </Badge>
                      ))}
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="inline-flex flex-wrap gap-2">
                      {ibgroup.accounttypes.map((type, i) => (
                       <Badge key={i} variant="outline" className="rounded-md px-2 py-0.5">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-3"> 
                    <Badge
                      variant="outline"
                      className={`${statusClasses[ibgroup.globalaccounttype]} rounded-md px-2 py-0.5`}
                    >
                      {ibgroup.globalaccounttype}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge
                      variant="outline"
                      className={`${statusClasses[ibgroup.status]} rounded-md px-2 py-0.5`}
                    >
                      {ibgroup.status}
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

      {/* Add Branch Modal */}
      {openAddModal && (
        <Modal
          title="Add New IB Group"
          onClose={() => {
            setOpenAddModal(false);
            resetForm();
          }}
          onSubmit={handleAddBranch}
          ibgroupName={ibgroupName}
          setIBgroupName={setIBgroupName}
          rebateRules={rebateRules}
          setRebateRules={setRebateRules}
          isActive={isActive}
          setIsActive={setIsActive}
          error={error}
          disclaimer={disclaimer}
          setDisclaimer={setDisclaimer}
        />
      )}

      {/* Update Branch Modal */}
      {updateModalOpen && (
        <Modal
          title="Update IB Group"
          onClose={() => {
            setUpdateModalOpen(false);
            resetForm();
          }}
          onSubmit={handleUpdateBranch}
          ibgroupName={ibgroupName}
          setIBgroupName={setIBgroupName}
          rebateRules={rebateRules}
          setRebateRules={setRebateRules}
          isActive={isActive}
          setIsActive={setIsActive}
          error={error}
          disclaimer={disclaimer}
          setDisclaimer={setDisclaimer}
        />
      )}

      <DeleteGroupModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        groupName="Silver IB Group"
        attachedUsers={attachedUsers}
        onConfirm={() => {
          console.log("Delete confirmed");
          setOpenDeleteModal(false);
        }}
      />
    </div>
  );
}

/* ------------------ Reusable Modal ------------------ */
function Modal({
  title,
  onClose,
  onSubmit,
  ibgroupName,
  setIBgroupName,
  rebateRules,
  setRebateRules,
  isActive,
  setIsActive,
  error,
  disclaimer,
  setDisclaimer,
}: {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  ibgroupName: string;
  setIBgroupName: (val: string) => void;
  rebateRules: string[];
  setRebateRules: (val: string[]) => void;
  isActive: boolean;
  setIsActive: (val: boolean) => void;
  error: string;
  disclaimer: string;
  setDisclaimer: (val: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-card border border-border p-6 max-h-[90vh] overflow-y-auto">
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
            label="Group Name"
            placeholder="IB Group Name"
            value={ibgroupName}
            onChange={(e) => setIBgroupName(e.target.value)}
            tooltip="Enter a name for the IB group"
            error={error}
          />

          {/* DISCLAIMER (Rich Text) */}
          <div>
            <RichTextEditor
              label="Details(Optional)"
              value={disclaimer}
              onChange={setDisclaimer}
              tooltip="Add Description for this group"
            />
          </div>

          {/* ✅ MULTISELECT - values prop must be string[] */}
          <SelectField
            label="Attach Rebate Rule(s)(Optional)"
            isMulti
            values={rebateRules}
            onValuesChange={(newValues: string[]) => {
              console.log("New values:", newValues); // Debug log
              setRebateRules(newValues);
            }}
            options={[
              { label: "Standard", value: "Standard" },
              { label: "Promo-Rebate", value: "Promo-Rebate" },
              { label: "Special-Rebate", value: "Special-Rebate" },
            ]}
            tooltip="Select rebate rules to link with this group"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <StatusToggle
              label="Status"
              status={isActive ? "Active" : "Disabled"}
              onChange={(s) => setIsActive(s === "Active")}
              tooltip="Enable or disable this IB Group."
            />
          </div>

          <div className="grid-cols-2 gap-3">
            <StatusToggle
              label="Global Account"
              status={isActive ? "Active" : "Disabled"}
              onChange={(s) => setIsActive(s === "Active")}
              tooltip="When enabled, this IB Group can show Global category accounts from linked rebate rules only if 'Show Global Accounts with IB Rebate Rules' is enabled."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 py-4 ">
          <Button variant="destructive" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            {title === "Add New IB Group" ? "Add Group" : "Update Group"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function DeleteGroupModal({
  open,
  setOpen,
  groupName,
  attachedUsers,
  onConfirm,
}: DeleteGroupModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] max-w-md text-center bg-card rounded-xl p-6 shadow-card">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-red-50 p-4">
            <AlertTriangle className="text-red-500" size={36} />
          </div>
        </div>

        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            You want to delete <strong>{groupName}</strong>?
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="text-left mt-4 space-y-3">
          <p className="text-text-muted font-semibold">Attached Users:</p>
          <div className="space-y-2">
            {attachedUsers.map((user, idx) => (
              <div key={idx} className="flex justify-between border-b border-muted pb-1">
                <span>{user.name} ({user.username})</span>
                <span className="text-text-muted">{user.email}</span>
              </div>
            ))}
          </div>

          {attachedUsers.length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              Please remove these users first before deleting the group.
            </p>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="flex justify-center gap-3 mt-6">
          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            Confirm
          </Button>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}