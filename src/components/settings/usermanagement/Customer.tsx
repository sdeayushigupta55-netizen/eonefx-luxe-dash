import { useState ,useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, X, AlertTriangle } from "lucide-react";
import { InputField } from "@/components/form/InputField";
import { StatusToggle } from "@/components/form/Status";
import { Card, CardContent } from "@/components/ui/card";
import CustomerGroups from "./CustomerGroups";
import IBGroups from "./IbGroups";
import SystemTags from "./SystemTags";
import UserMisc from "./UserMisc";
import UserPermission from "./UserPermission";

/* ---------------- TYPES ---------------- */
type RiskTag = {
  name: string;
  details: string;
  status: "Active" | "Disabled";
};

/* ---------------- STATUS STYLES ---------------- */
const statusClasses: Record<string, string> = {
  Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};

export default function CustomerSettings() {
  const [activeTab, setActiveTab] = useState("risk-profile");

  /* -------- MODALS -------- */
  const [openAddSystemModal, setOpenAddSystemModal] = useState(false);
  const [openAddIBModal, setOpenAddIBModal] = useState(false);
  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);

  const tabs = [
    { key: "risk-profile", label: "Risk Profile Tags" },
    { key: "system-tags", label: "System Tags" },
    { key: "customer-groups", label: "Customer Groups" },
    { key: "ib-groups", label: "IB Groups" },
    { key: "permission", label: "Permission" },
    { key: "misc", label: "Misc" },
  ];
 /* ---------------- TAB LABELS ---------------- */
const tabLabels: Record<string, string> = {
  "risk-profile": "Risk Profile Tag",
  "system-tags": "System Tags",
  "customer-groups": "Customer Groups",
  "ib-groups": "IB Groups",
  "permission": "Customer Permissions",
  "misc": "Customer Misc Settings",
};
  /* -------- CONTENT STATE -------- */
  const [rows, setRows] = useState<RiskTag[]>([
    {
      name: "Suspicious",
      details:
        "Unusual trading patterns or activities that could indicate potential market manipulation.",
      status: "Active",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [isActive, setIsActive] = useState(true);

 

  /* -------- FUNCTIONS -------- */
  const openEdit = (index: number) => {
    const row = rows[index];
    setActiveIndex(index);
    setName(row.name);
    setDetails(row.details);
    setIsActive(row.status === "Active");
    setEditOpen(true);
  };

  const saveEdit = () => {
    if (activeIndex === null) return;
    const updated = [...rows];
    updated[activeIndex] = {
      name,
      details,
      status: isActive ? "Active" : "Disabled",
    };
    setRows(updated);
    setEditOpen(false);
  };

  const confirmDelete = () => {
    if (activeIndex === null) return;
    setRows(rows.filter((_, i) => i !== activeIndex));
    setDeleteOpen(false);
  };

  /* -------- RENDER CONTENT -------- */
  const renderContent = () => {
    switch (activeTab) {
      case "system-tags":
        return <SystemTags openAddModal={openAddSystemModal} setOpenAddModal={setOpenAddSystemModal}/>;
      case "customer-groups":
        return <CustomerGroups openAddModal={openAddCustomerModal} setOpenAddModal={setOpenAddCustomerModal} />;
      case "ib-groups":
        return <IBGroups openAddModal={openAddIBModal} setOpenAddModal={setOpenAddIBModal} />;
      case "permission":
        return <UserPermission />;
      case "misc":
        return <UserMisc />;


      case "risk-profile":
      default:
        return (
          <>
            <Card>
              <CardContent className="p-0">
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
                      <tr key={index} className="border-t">
                        <td className="p-3">{row.name}</td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            className={`${statusClasses[row.status]} rounded-md`}
                          >
                            {row.status}
                          </Badge>
                        </td>
                        <td className="p-3 flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => openEdit(index)}
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => {
                              setActiveIndex(index);
                              setDeleteOpen(true);
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

{/* ADD MODAL */}
{ modalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <div className="w-full max-w-xl rounded-xl bg-card p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add Risk Profile Tag</h2>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setModalOpen(false)}
                    >
                      <X />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <InputField
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      tooltip="Enter the tag name"
                      placeholder="Tag Name"

                    />
                    <InputField
                      label="Details (optional)"
                      type="textarea"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      tooltip="Optional description of the tag"
                      placeholder="Details"
                    />
                    <StatusToggle
                      label="Status"
                      status={isActive ? "Active" : "Disabled"}
                      onChange={(s) => setIsActive(s === "Active")}
                      tooltip="Enable or disable this tag"
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <Button variant="destructive" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      const updated = [...rows];
                      updated.push({ name, details, status: isActive ? "Active" : "Disabled" });
                      setRows(updated);
                      setModalOpen(false);
                      setName("");
                      setDetails("");
                      setIsActive(true);
                    }}>
                      Add Tag
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* EDIT MODAL */}
            {editOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <div className="w-full max-w-xl rounded-xl bg-card p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit Risk Profile Tag</h2>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setEditOpen(false)}
                    >
                      <X />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <InputField
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      tooltip="Enable the tag name"
                    />
                    <InputField
                      label="Details (optional)"
                      type="textarea"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      tooltip="Optional description of the tag"
                    />
                    <StatusToggle
                      label="Status"
                      status={isActive ? "Active" : "Disabled"}
                      onChange={(s) => setIsActive(s === "Active")}
                      tooltip="Enable or disable this tag"
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <Button variant="destructive" onClick={() => setEditOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={saveEdit}>Save Changes</Button>
                  </div>
                </div>
              </div>
            )}

            {/* DELETE MODAL */}
            {deleteOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <div className="w-full max-w-md rounded-xl bg-card p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900/30">
                    <AlertTriangle className="text-red-500" size={28} />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Are You Sure?</h2>
                  <p className="mb-8">
                    You want to delete <strong>{rows[activeIndex!]?.name}</strong> Risk Profile Tag?
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={confirmDelete}>
                      Confirm
                    </Button>
                    <Button variant="destructive" onClick={() => setDeleteOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h1 className="text-xl font-semibold capitalize">{tabLabels[activeTab]}</h1>

        {["system-tags", "ib-groups", "customer-groups","risk-profile"].includes(activeTab) && (
          <Button
            className="bg-primary"
            onClick={() => {
              if (activeTab === "system-tags") setOpenAddSystemModal(true);
              if (activeTab === "ib-groups") setOpenAddIBModal(true);
              if (activeTab === "customer-groups") setOpenAddCustomerModal(true);
              if (activeTab === "risk-profile") setModalOpen(true);
            }}
          >
            + Add New
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md border transition whitespace-nowrap ${activeTab === tab.key
              ? "bg-primary text-primary-foreground"
              : "bg-muted border-border hover:bg-muted/70"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}
