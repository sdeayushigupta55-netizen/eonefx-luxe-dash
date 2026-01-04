import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, List, X, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { ColorInputWithPopover } from "@/components/form/ColorInputWithPopover";

import { Switch } from "@/components/ui/switch";

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
  pipelinecolor: { background: string }
  default?: boolean;
};

const tabs = [
  { key: "lead-source", label: "Lead Source" },
  { key: "pipeline", label: "Pipeline" },
];

// --- Reusable Delete Modal ---
function DeleteModal({
  open,
  setOpen,
  title,
  description,
  onConfirm,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  title: string;
  description?: string;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-xl bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900/30">
          <AlertTriangle className="text-red-500" size={28} />
        </div>
        <h2 className="text-2xl font-semibold mb-2">{title || "Are You Sure?"}</h2>
        {description && <p className="mb-8">{description}</p>}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
export default function LeadSettings() {
  const [activeTab, setActiveTab] = useState("lead-source");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [leadSources, setLeadSources] = useState<LeadSource[]>([
    { id: 1, name: "Email" },
    { id: 2, name: "Google" },
    { id: 3, name: "Facebook" },
    { id: 4, name: "Direct" },
    { id: 5, name: "TV" },
    { id: 6, name: "Friend" },
  ]);

  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: 1,
      name: "Sales Pipeline",
      pipelinecolor: { background: "#3b82f6" },
      stages: [
        { id: 1, name: "Generated", color: "#facc15" },
        { id: 2, name: "On Going", color: "#3b82f6", isDefault: true },
        { id: 3, name: "Win", color: "#22c55e" },
        { id: 4, name: "Lost", color: "#ef4444" },
        { id: 5, name: "Main", color: "#000000" },
        { id: 6, name: "Sales", color: "#dc2626" },
      ],
    },
    {
      id: 2,
      name: "Sales Pipeline 2",
      pipelinecolor: { background: "#10b981" },
      stages: [
        { id: 1, name: "Generated", color: "#facc15" },
        { id: 2, name: "On Going", color: "#3b82f6", isDefault: true },
        { id: 3, name: "Win", color: "#22c55e" },
        { id: 4, name: "Lost", color: "#ef4444" },
        { id: 5, name: "Main", color: "#000000" },
        { id: 6, name: "Sales", color: "#dc2626" },
      ],
    },
  ]);

  const [expandedPipeline, setExpandedPipeline] = useState<number | null>(null);

  // Pagination calculations
  const totalItems = leadSources.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const paginatedLeadSources = leadSources.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // Modal states
  const [openSourceModal, setOpenSourceModal] = useState(false);
  const [openPipelineModal, setOpenPipelineModal] = useState(false);
  const [openStageModal, setOpenStageModal] = useState(false);

  // For update modals
  const [editId, setEditId] = useState<number | null>(null);
  const [editPipelineId, setEditPipelineId] = useState<number | null>(null);
  const [editStage, setEditStage] = useState<{ pipelineId: number; stage: Stage } | null>(null);

  // For delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<"lead-source" | "pipeline" | "stage" | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteStageInfo, setDeleteStageInfo] = useState<{ pipelineId: number; stageId: number } | null>(null);

  // Form states
  const [sourceName, setSourceName] = useState("");
  const [pipelineName, setPipelineName] = useState("");
  const [pipelineColor, setPipelineColor] = useState("#000000");
  const [stagePipelineId, setStagePipelineId] = useState<number | "">("");
  const [stageName, setStageName] = useState("");
  const [stageColor, setStageColor] = useState("#ff0000");

  // Add/Edit handlers
  const handleAdd = () => {
    setEditId(null);
    setSourceName("");
    setOpenSourceModal(true);
  };

  const handleAddPipeline = () => {
    setEditPipelineId(null);
    setPipelineName("");
    setPipelineColor("#000000");
    setOpenPipelineModal(true);
  };

  const handleAddStage = () => {
    setEditStage(null);
    setStagePipelineId(pipelines.length > 0 ? pipelines[0].id : "");
    setStageName("");
    setStageColor("#000000");
    setOpenStageModal(true);
  };

  // Lead Source Edit
  const handleEdit = (source: LeadSource) => {
    setEditId(source.id);
    setSourceName(source.name);
    setOpenSourceModal(true);
  };

  // Pipeline Edit
  const handleEditPipeline = (pipeline: Pipeline) => {
    setEditPipelineId(pipeline.id);
    setPipelineName(pipeline.name);
    setPipelineColor(pipeline.pipelinecolor.background);
    setOpenPipelineModal(true);
  };

  // Stage Edit
  const handleEditStage = (pipelineId: number, stage: Stage) => {
    setEditStage({ pipelineId, stage });
    setStagePipelineId(pipelineId);
    setStageName(stage.name);
    setStageColor(stage.color);
    setOpenStageModal(true);
  };

  // Delete handlers
  const handleDeleteLeadSourceClick = (id: number) => {
    setDeleteType("lead-source");
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDeletePipelineClick = (id: number) => {
    setDeleteType("pipeline");
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteStageClick = (pipelineId: number, stageId: number) => {
    setDeleteType("stage");
    setDeleteStageInfo({ pipelineId, stageId });
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (deleteType === "lead-source" && deleteId !== null) {
      setLeadSources((prev) => prev.filter((s) => s.id !== deleteId));
    }
    if (deleteType === "pipeline" && deleteId !== null) {
      setPipelines((prev) => prev.filter((p) => p.id !== deleteId));
    }
    if (deleteType === "stage" && deleteStageInfo) {
      setPipelines((prev) =>
        prev.map((p) =>
          p.id === deleteStageInfo.pipelineId
            ? { ...p, stages: p.stages.filter((s) => s.id !== deleteStageInfo.stageId) }
            : p
        )
      );
    }
    setDeleteModalOpen(false);
    setDeleteId(null);
    setDeleteType(null);
    setDeleteStageInfo(null);
  };

  // Save handlers
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
    setOpenSourceModal(false);
    setSourceName("");
    setEditId(null);
  };

  const handleSavePipeline = () => {
    if (!pipelineName.trim()) return;
    if (editPipelineId !== null) {
      setPipelines((prev) =>
        prev.map((p) =>
          p.id === editPipelineId
            ? { ...p, name: pipelineName, pipelinecolor: { background: pipelineColor } }
            : p
        )
      );
    } else {
      setPipelines((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: pipelineName,
          stages: [],
          pipelinecolor: { background: pipelineColor }
        },
      ]);
    }
    setOpenPipelineModal(false);
    setPipelineName("");
    setPipelineColor("#000000");
    setEditPipelineId(null);
  };

  const handleSaveStage = () => {
    if (!stageName.trim() || !stagePipelineId) return;
    if (editStage) {
      setPipelines((prev) =>
        prev.map((p) =>
          p.id === editStage.pipelineId
            ? {
                ...p,
                stages: p.stages.map((s) =>
                  s.id === editStage.stage.id
                    ? { ...s, name: stageName, color: stageColor }
                    : s
                ),
              }
            : p
        )
      );
    } else {
      setPipelines((prev) =>
        prev.map((p) =>
          p.id === stagePipelineId
            ? {
                ...p,
                stages: [
                  ...p.stages,
                  {
                    id: Date.now(),
                    name: stageName,
                    color: stageColor,
                  },
                ],
              }
            : p
        )
      );
    }
    setOpenStageModal(false);
    setStagePipelineId("");
    setStageName("");
    setStageColor("#000000");
    setEditStage(null);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-semibold">
          {activeTab === "lead-source" ? "Lead Source" : "Lead Pipeline"}
        </h1>
        {activeTab === "lead-source" && (
          <div className="flex justify-end gap-3 w-full sm:w-auto">
            <Button onClick={handleAdd}>+ Add New Source</Button>
          </div>
        )}
        {activeTab === "pipeline" && (
          <div className="flex justify-end gap-3 w-full sm:w-auto">
            <Button onClick={handleAddPipeline}>+ Add New Pipeline</Button>
            <Button onClick={handleAddStage}>+ Add New Deal Stage</Button>
          </div>
        )}
      </div>

      {/* INTERNAL TABS */}
      <div className="flex gap-1 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md border transition
              ${activeTab === tab.key
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
                {paginatedLeadSources.map((source, index) => (
                  <tr
                    key={source.id}
                    className="border-t border-border"
                  >
                    <td className="px-4 py-3">{startIndex + index + 1}</td>
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
                          variant="destructive"
                          onClick={() => handleDeleteLeadSourceClick(source.id)}
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

      {/* PAGINATION FOOTER FOR LEAD SOURCE */}
      {activeTab === "lead-source" && (
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
      )}

      {/* ================= ADD / EDIT LEAD SOURCE MODAL ================= */}
      {openSourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {editId ? "Update Lead Source" : "Add Lead Source"}
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpenSourceModal(false)}
                >
                  <X size={18} />
                </Button>
              </div>
              <div className="space-y-2">
                <InputField
                  label="Name"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full"
                  tooltip="Enter a name for the lead source"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="destructive"
                  onClick={() => setOpenSourceModal(false)}
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
          {pipelines.map((pipeline) => (
            <Card key={pipeline.id}>
              <CardContent className="p-4 space-y-4">
                {/* PIPELINE HEADER */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={pipeline.pipelinecolor} />
                      <h2 className="font-semibold">{pipeline.name}</h2>
                      <Pencil
                        className="w-4 h-4 cursor-pointer text-muted-foreground"
                        onClick={() => handleEditPipeline(pipeline)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pipeline.stages.length} Deal Stages
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                  <Switch
  checked={!!pipeline.default}
  onCheckedChange={() => {
    setPipelines(pipelines.map(p =>
      p.id === pipeline.id
        ? { ...p, default: !p.default }
        : { ...p, default: false }
    ));
  }}
  
/>
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
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDeletePipelineClick(pipeline.id)}
                    >
                      <Trash2 className="w-4 h-4" />
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
                                className="w-3 h-3 rounded-full"
                                style={{ background: stage.color }}
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
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleEditStage(pipeline.id, stage)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  onClick={() => handleDeleteStageClick(pipeline.id, stage.id)}
                                >
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

      {/* ================= ADD / EDIT PIPELINE MODAL ================= */}
      {openPipelineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {editPipelineId ? "Update Pipeline" : "Add New Pipeline"}
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpenPipelineModal(false)}
                >
                  <X size={18} />
                </Button>
              </div>
              <div className="space-y-2">
                <InputField
                  label="Name"
                  value={pipelineName}
                  onChange={(e) => setPipelineName(e.target.value)}
                  placeholder="Enter Name"
                  className="w-full"
                  tooltip="Enter a name for the pipeline (e.g., Sales, Onboarding)"
                />
                <ColorInputWithPopover
                  value={pipelineColor}
                  onChange={setPipelineColor}
                  label="Label Color"
                  tooltip="Choose a color to visually represent this pipeline"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="destructive"
                  onClick={() => setOpenPipelineModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSavePipeline}>
                  {editPipelineId ? "Update" : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ================= ADD / EDIT DEAL STAGE MODAL ================= */}
      {openStageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {editStage ? "Update Deal Stage" : "Add New Deal Stage"}
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpenStageModal(false)}
                >
                  <X size={18} />
                </Button>
              </div>
              <div className="space-y-2">
                <SelectField
                  label="Pipeline"
                  value={stagePipelineId ? String(stagePipelineId) : ""}
                  onChange={(v) => setStagePipelineId(Number(v))}
                  options={pipelines.map((p) => ({
                    label: p.name,
                    value: String(p.id),
                  }))}
                  placeholder="Select pipeline"
                  tooltip="Select the pipeline to add this stage to"
                  // disabled={!!editStage}
                />
                <InputField
                  label="Stage Name"
                  value={stageName}
                  onChange={(e) => setStageName(e.target.value)}
                  placeholder="Enter stage name"
                  className="w-full"
                  tooltip="Enter a name for the deal stage"
                />
                <div className="space-y-2">
                  <ColorInputWithPopover
                    value={stageColor}
                    onChange={setStageColor}
                    label="Label Color"
                    tooltip="Choose a color to visually represent this stage"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="destructive"
                  onClick={() => setOpenStageModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveStage}>
                  {editStage ? "Update" : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ================= DELETE MODAL (REUSABLE) ================= */}
        <DeleteModal
      open={deleteModalOpen}
      setOpen={setDeleteModalOpen}
      title={
        deleteType === "lead-source"
          ? "Are you sure you want to delete this lead source?"
          : deleteType === "pipeline"
          ? "Are you sure you want to delete this pipeline?"
          : "Are you sure you want to delete this stage?"
      }
      description={
        deleteType === "lead-source" && deleteId !== null
          ? `You want to delete "${leadSources.find(s => s.id === deleteId)?.name}" Lead Source?`
          : deleteType === "pipeline" && deleteId !== null
          ? `You want to delete "${pipelines.find(p => p.id === deleteId)?.name}" Pipeline?`
          : deleteType === "stage" && deleteStageInfo
          ? `You want to delete "${pipelines.find(p => p.id === deleteStageInfo.pipelineId)?.stages.find(s => s.id === deleteStageInfo.stageId)?.name}" Stage?`
          : ""
      }
      onConfirm={handleConfirmDelete}
    />
    </div>
  );
}