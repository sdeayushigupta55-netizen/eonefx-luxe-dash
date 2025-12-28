import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Edit,
  Trash,
  Plus,
  ChevronLeft,
  ChevronRight,
  Info,
  X,
  Pencil,
  List,
  Trash2,
} from "lucide-react";
import { InputField } from "@/components/form/InputField";
import { StatusToggle } from "@/components/form/Status";


/* ==================== Main Component ==================== */
export default function DocPlatformSocialLinks() {
  const [activeTab, setActiveTab] = useState("Document Links");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [documentLinks, setDocumentLinks] = useState([
    { id: 1, title: "AML Policy", url: "https://cdn.brokeret.com/doc/example.pdf", status: true },
    { id: 2, title: "Client Agreement", url: "https://cdn.brokeret.com/doc/example.pdf", status: false },
  ]);

  const [platformLinks, setPlatformLinks] = useState([
    { id: 1, title: "Desktop Terminal", url: "https://download.mql5.com", operation: "Windows", platform: "mt5", status: true },
  ]);

  const [socialLinks, setSocialLinks] = useState([
    { id: 1, title: "Facebook", url: "https://facebook.com", status: true },
  ]);

  /* ---------------- MODAL STATE ---------------- */
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [operation, setOperation] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- HELPERS ---------------- */
  const getData = () => {
    if (activeTab === "Document Links") return documentLinks;
    if (activeTab === "Platform Links") return platformLinks;
    return socialLinks;
  };

  const totalItems = getData().length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const pageData = getData().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  /* ---------------- OPEN MODALS ---------------- */
  const openAddModal = () => {
    setEditItem(null);
    setTitle("");
    setUrl("");
    setOperation("");
    setPlatform("");
    setStatus(true);
    setError("");
    setFormOpen(true);
  };

  const openEditModal = (row: any) => {
    setEditItem(row);
    setTitle(row.title);
    setUrl(row.url);
    setOperation(row.operation || "");
    setPlatform(row.platform || "");
    setStatus(row.status);
    setError("");
    setFormOpen(true);
  };

  const statusClasses: Record<string, string> = {
    Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = () => {
    if (!title.trim() || !url.trim()) {
      setError("All fields are required");
      return;
    }

    const payload = {
      id: editItem ? editItem.id : Date.now(),
      title,
      url,
      operation,
      platform,
      status,
    };

    if (activeTab === "Document Links") {
      setDocumentLinks((prev) => editItem ? prev.map(i => i.id === editItem.id ? payload : i) : [...prev, payload]);
    }
    if (activeTab === "Platform Links") {
      setPlatformLinks((prev) => editItem ? prev.map(i => i.id === editItem.id ? payload : i) : [...prev, payload]);
    }
    if (activeTab === "Social Links") {
      setSocialLinks((prev) => editItem ? prev.map(i => i.id === editItem.id ? payload : i) : [...prev, payload]);
    }

    setFormOpen(false);
    setEditItem(null);
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = () => {
    if (!deleteItem) return;
    if (activeTab === "Document Links") setDocumentLinks((prev) => prev.filter(i => i.id !== deleteItem.id));
    if (activeTab === "Platform Links") setPlatformLinks((prev) => prev.filter(i => i.id !== deleteItem.id));
    if (activeTab === "Social Links") setSocialLinks((prev) => prev.filter(i => i.id !== deleteItem.id));
    setDeleteOpen(false);
    setDeleteItem(null);
  };

  /* ================= UI ================= */
  return (
    <TooltipProvider>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">{activeTab}</h2>
          {activeTab !== "Social Links" && (
            <Button className="w-full sm:w-auto" onClick={openAddModal}>
              <Plus size={16} /> Add New
            </Button>
          )}
        </div>

        {/* TABS */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
          {["Document Links", "Platform Links", "Social Links"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-md border transition ${activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted border-border"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-muted/60 text-sm">
              <tr>
                <th className="p-3">TITLE</th>
                <th className="p-3">URL</th>
                {(activeTab === "Platform Links") && <th >Operation</th>}
                {(activeTab === "Platform Links") && <th >Platform</th>}
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {pageData.map((row: any) => (
                <tr key={row.id} className="border-t border-[#1a2b40]">
                  <td className="p-3">{row.title}</td>
                  <td className="p-3 break-all text-sm text-muted-foreground">{row.url}</td>
                  {activeTab === "Platform Links" && <td >{row.operation}</td>}
                  {activeTab === "Platform Links" && <td >{row.platform}</td>}
                  <td className="p-3">
                    <Badge
                        variant="outline"
                        className={`${statusClasses[row.status ? "Active" : "Disabled"]} rounded-md px-2 py-0.5`}
                      >
                      {row.status ? "Active" : "Disabled"}
                    </Badge>
                  </td>
                  {activeTab !== "Social Links" && (
                    <td className="p-3 flex flex-wrap gap-2">
                      <Button
                      size="icon"
                      variant="outline"
                      onClick={() => openEditModal(row)}
                    >
                      <Pencil size={14} />
                    </Button>

                    <Button size="icon" variant="destructive" onClick={() => { setDeleteItem(row); setDeleteOpen(true); }}>
                      <Trash2 size={14} />
                    </Button>
                    </td>
                  )}
                  {activeTab === "Social Links" && (
                    <td className="p-3 flex flex-wrap gap-2">
                      <Button size="icon" variant="outline" onClick={() => openEditModal(row)}><Pencil size={14} /></Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-muted-foreground gap-2">
          <span>Showing {(currentPage - 1) * itemsPerPage + 1} – {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft size={16} /></Button>
            <span>{currentPage}/{totalPages}</span>
            <Button size="sm" variant="outline" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}><ChevronRight size={16} /></Button>
          </div>
        </div>

        {/* ================= ADD / UPDATE MODAL ================= */}
        {/* ================= ADD / UPDATE MODAL ================= */}
{formOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2">
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-xl bg-card border border-border p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {editItem ? `Update ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
        </h2>
        <Button size="icon" variant="ghost" onClick={() => setFormOpen(false)}>
          <X size={18} />
        </Button>
      </div>

      <div className="space-y-4">
        <InputField
          label="Title"
          tooltip="Enter the document title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document Title"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}

        <InputField
          label="URL"
          tooltip="Enter the full document URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Document Link"
        />

        {activeTab === "Platform Links" && (
          <>
            <InputField
              label="Operation"
              tooltip="Enter operation type (Windows/Mac)"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            />
            <InputField
              label="Platform"
              tooltip="Enter platform (MT4/MT5)"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </>
        )}

        <StatusToggle
          label="Status"
          status={status ? "Active" : "Disabled"}
          onChange={(s) => setStatus(s === "Active")}
          tooltip="Enable or disable this document link"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
        <Button variant="destructive" onClick={() => setFormOpen(false)}>Cancel</Button>
        <Button onClick={handleSave}>{editItem ? "Update" : "Add"}</Button>
      </div>
    </div>
  </div>
)}


        {/* ================= DELETE MODAL ================= */}
        {deleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2">
            <div className="w-full max-w-md rounded-xl bg-card border border-border p-6 text-center">
              <Trash className="mx-auto mb-4 text-red-500" size={40} />
              <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
              <p className="text-muted-foreground mb-6">You want to delete this link?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button variant="outline" onClick={handleDelete}>✓ Confirm</Button>
                <Button variant="destructive" onClick={() => setDeleteOpen(false)}>✕ Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
