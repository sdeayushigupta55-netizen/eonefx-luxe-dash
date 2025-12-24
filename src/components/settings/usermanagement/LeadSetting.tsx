import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, List, X } from "lucide-react";

/* ================= TYPES ================= */

type LeadSource = {
  id: number;
  name: string;
};

type Stage = {
  id: number;
  name: string;
  color: string;
  isDefault?: boolean;
};

type Pipeline = {
  id: number;
  name: string;
  stages: Stage[];
};
 /* ✅ INTERNAL TABS */
  const tabs = [
    { key: "lead-source", label: "Lead Source" },
    { key: "pipeline", label: "Pipeline" },
   
  ];

/* ================= COMPONENT ================= */

export default function LeadSettings() {
  const [activeTab, setActiveTab] = useState("lead-source");
  

  /* ================= STATE ================= */

  const [leadSources, setLeadSources] = useState<LeadSource[]>([
    { id: 1, name: "Email" },
    { id: 2, name: "Google" },
    { id: 3, name: "Facebook" },
    { id: 4, name: "Direct" },
    { id: 5, name: "TV" },
    { id: 6, name: "Friend" },
  ]);

 const pipelines: Pipeline[] = [
  {
    id: 1,
    name: "Sales Pipeline",
    stages: [
      { id: 1, name: "Generated", color: "bg-yellow-400" },
      { id: 2, name: "On Going", color: "bg-blue-500", isDefault: true },
      { id: 3, name: "Win", color: "bg-green" },
      { id: 4, name: "Lost", color: "bg-red-500" },
      { id: 5, name: "Main", color: "bg-black" },
      { id: 6, name: "Sales", color: "bg-red-600" },
    ],
  },
  {
    id: 1,
    name: "Sales Pipeline",
    stages: [
      { id: 1, name: "Generated", color: "bg-yellow-400" },
      { id: 2, name: "On Going", color: "bg-blue-500", isDefault: true },
      { id: 3, name: "Win", color: "bg-green" },
      { id: 4, name: "Lost", color: "bg-red-500" },
      { id: 5, name: "Main", color: "bg-black" },
      { id: 6, name: "Sales", color: "bg-red-600" },
    ],
  },
];

  const [expandedPipeline, setExpandedPipeline] = useState<number | null>(null);

  /* ================= MODAL ================= */

  const [openModal, setOpenModal] = useState(false);
  const [sourceName, setSourceName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  /* ================= ADD ================= */

  const handleAdd = () => {
    setEditId(null);
    setSourceName("");
    setOpenModal(true);
  };

  /* ================= EDIT ================= */

  const handleEdit = (source: LeadSource) => {
    setEditId(source.id);
    setSourceName(source.name);
    setOpenModal(true);
  };

  /* ================= DELETE ================= */

  const handleDelete = (id: number) => {
    setLeadSources((prev) => prev.filter((s) => s.id !== id));
  };

  /* ================= SAVE ================= */

  const handleSave = () => {
    if (!sourceName.trim()) return;

    if (editId !== null) {
      setLeadSources((prev) =>
        prev.map((s) =>
          s.id === editId ? { ...s, name: sourceName } : s
        )
      );
    } else {
      setLeadSources((prev) => [
        ...prev,
        { id: Date.now(), name: sourceName },
      ]);
    }

    setOpenModal(false);
    setSourceName("");
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {activeTab === "lead-source" ? "Lead Source" : "Lead Pipeline"}
        </h1>

      </div>

       {/* INTERNAL TABS */}
      <div className="flex gap-1 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md border transition
              ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted border-border hover:bg-muted/70"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= LEAD SOURCE TAB ================= */}
      {activeTab === "lead-source" && (
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">NAME</th>
                  <th className="px-4 py-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {leadSources.map((source, index) => (
                  <tr
                    key={source.id}
                    className="border-t border-border"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">
                      {source.name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleEdit(source)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDelete(source.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* ================= ADD / EDIT MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {editId ? "Edit Lead Source" : "Add New Lead Source"}
                </h2>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpenModal(false)}
                >
                  <X size={18} />
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Source Name
                </label>
                <Input
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  placeholder="Enter lead source"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editId ? "Update" : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

     {/* ================= PIPELINE TAB ================= */}
      {activeTab === "pipeline" && (
        <div className="space-y-6">
          <div className="flex justify-end gap-3">
            <Button >+ Add New Pipeline</Button>
            <Button>+ Add New Deal Stage</Button>
          </div>

          {pipelines.map((pipeline) => (
            <Card key={pipeline.id}>
              <CardContent className="p-4 space-y-4">
                {/* PIPELINE HEADER */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500" />
                      <h2 className="font-semibold">{pipeline.name}</h2>
                      <Pencil className="w-4 h-4 cursor-pointer text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pipeline.stages.length} Deal Stages
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                     
                      Default
                    </div>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        setExpandedPipeline(
                          expandedPipeline === pipeline.id
                            ? null
                            : pipeline.id
                        )
                      }
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* STAGES DROPDOWN */}
                {expandedPipeline === pipeline.id && (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/40">
                        <tr>
                          <th className="px-4 py-3 text-left">#</th>
                          <th className="px-4 py-3 text-left">
                            DEAL STAGE
                          </th>
                          <th className="px-4 py-3 text-left">
                            DEFAULT DEAL STAGE
                          </th>
                          <th className="px-4 py-3 text-right">
                            ACTION
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pipeline.stages.map((stage, index) => (
                          <tr
                            key={stage.id}
                            className="border-t border-border"
                          >
                            <td className="px-4 py-3">{index + 1}</td>

                            <td className="px-4 py-3 flex items-center gap-2">
                              <span
                                className={`w-3 h-3 rounded-full ${stage.color}`}
                              />
                              {stage.name}
                            </td>

                            <td className="px-4 py-3">
                              <span className="flex items-center gap-2 text-green-500">
                                <span
                                  className={`w-3 h-3 rounded-full ${
                                    stage.isDefault
                                      ? "bg-green-500 ring-2 ring-green-400"
                                      : "bg-gray-400"
                                  }`}
                                />
                                Default
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-2">
                                <Button size="icon" variant="outline">
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="outline">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
