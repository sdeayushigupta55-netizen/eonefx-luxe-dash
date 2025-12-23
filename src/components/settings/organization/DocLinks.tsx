import React, { useState, useEffect } from "react";
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
} from "lucide-react";

export default function DocPlatformSocialLinks() {
  const [activeTab, setActiveTab] = useState("Document Links");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  /* ---------------- DATA ---------------- */

  const [documentLinks, setDocumentLinks] = useState([
    { id: 1, title: "AML Policy", url: "https://cdn.brokeret.com/doc/example.pdf", status: true },
    { id: 2, title: "Client Agreement", url: "https://cdn.brokeret.com/doc/example.pdf", status: false },
  ]);

  const [platformLinks, setPlatformLinks] = useState([
    { id: 1, title: "Desktop Terminal", url: "https://download.mql5.com", operation: "Windows", platform: "MT5", status: true },
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
  const pageData = getData().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    setTitle(row.title || "");
    setUrl(row.url || "");
    setOperation(row.operation || "");
    setPlatform(row.platform || "");
    setStatus(row.status ?? true);
    setError("");
    setFormOpen(true);
  };

  /* ---------------- SAVE ---------------- */

  const handleSave = () => {
    if (!title.trim() || !url.trim()) {
      setError("All required fields must be filled");
      return;
    }

    const payload: any = { id: editItem ? editItem.id : Date.now(), title, url, status };

    if (activeTab === "Platform Links") {
      payload.operation = operation;
      payload.platform = platform;
      setPlatformLinks((prev) =>
        editItem ? prev.map((i) => (i.id === editItem.id ? payload : i)) : [...prev, payload]
      );
    } else if (activeTab === "Document Links") {
      setDocumentLinks((prev) =>
        editItem ? prev.map((i) => (i.id === editItem.id ? payload : i)) : [...prev, payload]
      );
    } else {
      setSocialLinks((prev) =>
        editItem ? prev.map((i) => (i.id === editItem.id ? payload : i)) : [...prev, payload]
      );
    }

    setFormOpen(false);
    setEditItem(null);
  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = () => {
    if (!deleteItem) return;

    if (activeTab === "Document Links") {
      setDocumentLinks((prev) => prev.filter((i) => i.id !== deleteItem.id));
    } else if (activeTab === "Platform Links") {
      setPlatformLinks((prev) => prev.filter((i) => i.id !== deleteItem.id));
    }

    setDeleteOpen(false);
    setDeleteItem(null);
  };

  /* ================= UI ================= */

  return (
    <TooltipProvider>
      <div className="text-white">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">{activeTab}</h2>
          {activeTab !== "Social Links" && (
            <Button onClick={openAddModal}>
              <Plus size={16} className="mr-2" /> Add
            </Button>
          )}
        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-6">
          {["Document Links", "Platform Links", "Social Links"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md border transition ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted border-border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-3">TITLE</th>
                  {activeTab === "Platform Links" && <th className="p-3">OPERATION</th>}
                  {activeTab === "Platform Links" && <th className="p-3">PLATFORM</th>}
                  <th className="p-3">URL</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {pageData.map((row: any) => (
                  <tr key={row.id} className="border-t border-border">
                    <td className="p-3">{row.title}</td>
                    {activeTab === "Platform Links" && <td className="p-3">{row.operation}</td>}
                    {activeTab === "Platform Links" && <td className="p-3">{row.platform}</td>}
                    <td className="p-3 break-all text-sm text-muted-foreground">{row.url}</td>
                    <td className="p-3">
                      <Badge className={row.status ? "bg-emerald-600/20 text-emerald-400" : "bg-red-600/20 text-red-400"}>
                        {row.status ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-3 flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => openEditModal(row)}>
                        <Edit size={16} />
                      </Button>
                      {activeTab !== "Social Links" && (
                        <Button size="icon" variant="ghost" onClick={() => { setDeleteItem(row); setDeleteOpen(true); }}>
                          <Trash size={16} />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} – {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
              <ChevronLeft size={16} />
            </Button>
            <span>{currentPage}/{totalPages}</span>
            <Button size="sm" variant="outline" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        {/* ================= FORM MODAL ================= */}
        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-xl bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {editItem
                    ? activeTab === "Document Links"
                      ? "Update Document Link"
                      : activeTab === "Platform Links"
                      ? "Update Platform Link"
                      : "Update Social Link"
                    : activeTab === "Document Links"
                    ? "Add New Document Link"
                    : activeTab === "Platform Links"
                    ? "Add New Platform Link"
                    : "Add New Social Link"}
                </h2>
                <Button size="icon" variant="ghost" onClick={() => setFormOpen(false)}>
                  <X size={18} />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm block mb-1 flex items-center gap-2">
                    Title <span className="text-red-500">*</span>
                    <Tooltip>
                      <TooltipTrigger><Info className="w-4 h-4 cursor-pointer" /></TooltipTrigger>
                      <TooltipContent>Enter the title</TooltipContent>
                    </Tooltip>
                  </label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                {activeTab === "Platform Links" && (
                  <>
                    <div>
                      <label className="text-sm block mb-1 flex items-center gap-2">
                        Operation
                        <Tooltip>
                          <TooltipTrigger><Info className="w-4 h-4 cursor-pointer" /></TooltipTrigger>
                          <TooltipContent>Enter platform operation system</TooltipContent>
                        </Tooltip>
                      </label>
                      <Input value={operation} onChange={(e) => setOperation(e.target.value)} />
                    </div>

                    <div>
                      <label className="text-sm block mb-1 flex items-center gap-2">
                        Platform
                        <Tooltip>
                          <TooltipTrigger><Info className="w-4 h-4 cursor-pointer" /></TooltipTrigger>
                          <TooltipContent>Enter platform type (MT4/MT5)</TooltipContent>
                        </Tooltip>
                      </label>
                      <Input value={platform} onChange={(e) => setPlatform(e.target.value)} />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-sm block mb-1 flex items-center gap-2">
                    URL <span className="text-red-500">*</span>
                    <Tooltip>
                      <TooltipTrigger><Info className="w-4 h-4 cursor-pointer" /></TooltipTrigger>
                      <TooltipContent>Enter full URL</TooltipContent>
                    </Tooltip>
                  </label>
                  <Input value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>

                <div className="flex items-center gap-3">
                  <span>Status</span>
                  <button
                    onClick={() => setStatus(!status)}
                    className={`w-11 h-6 rounded-full relative transition ${status ? "bg-primary" : "bg-gray-400"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition ${status ? "translate-x-5" : ""}`} />
                  </button>
                  <span>{status ? "Active" : "Inactive"}</span>
                </div>

                {error && <p className="text-red-500 text-xs">{error}</p>}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>{editItem ? "Update" : "Add"}</Button>
              </div>
            </div>
          </div>
        )}

        {/* ================= DELETE MODAL ================= */}
        {deleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md rounded-xl bg-card border border-border p-8 text-center">
              <Trash className="mx-auto mb-4 text-red-500" size={40} />
              <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
              <p className="text-muted-foreground mb-6">You want to delete this link?</p>
              <div className="flex justify-center gap-4">
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
