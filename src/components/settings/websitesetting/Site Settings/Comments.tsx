import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ListFilter, FileDown, X } from "lucide-react";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { StatusToggle } from "@/components/form/Status";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Comment {
  title: string;
  type: string;
  description: string;
  status: "Active" | "Disabled";
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      title: "Incomplete KYC",
      type: "Accounts",
      description: "Your KYC is Incomplete. Please Submit Missing Documents To...",
      status: "Active",
    },
    {
      title: "Invalid Group Selection",
      type: "Withdraw Account",
      description: "Selected Group Is Not Allowed For This Schema. Choose...",
      status: "Active",
    },
    {
      title: "Leverage Not Supported",
      type: "Withdraw Funds",
      description: "Requested Leverage Is Not Supported For This Account Type.",
      status: "Active",
    },
    {
      title: "Deposit Received",
      type: "KYC",
      description: "We Have Received Your Deposit Request And It Is...",
      status: "Disabled",
    },
    {
      title: "Deposit Approved",
      type: "Deposit",
      description: "Your Deposit Has Been Approved And The Funds Have...",
      status: "Active",
    },
  ]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Deposit");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Disabled">("Active");

  const statusClasses: Record<string, string> = {
    Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
  };

  const typeClasses: Record<string, string> = {
    Accounts: "bg-gray-500/10 text-white border border-gray-500/20",
    Deposit: "bg-gray-500/10 text-white border border-gray-500/20",
    "Withdraw Funds": "bg-gray-500/10 text-white border border-gray-500/20",
    "Withdraw Account": "bg-gray-500/10 text-white border border-gray-500/20",
    KYC: "bg-gray-500/10 text-white border border-gray-500/20",
  };

  const handleAddComment = () => {
    if (!title.trim() || !description.trim()) return;

    setComments([
      ...comments,
      { title, type, description, status },
    ]);

    resetForm();
    setOpenAddModal(false);
  };

  const handleEditComment = () => {
    if (editIndex === null) return;
    if (!title.trim() || !description.trim()) return;

    const updatedComments = [...comments];
    updatedComments[editIndex] = { title, type, description, status };
    setComments(updatedComments);

    resetForm();
    setOpenEditModal(false);
  };

  const handleOpenEditModal = (index: number) => {
    const comment = comments[index];
    setTitle(comment.title);
    setType(comment.type);
    setDescription(comment.description);
    setStatus(comment.status);
    setEditIndex(index);
    setOpenEditModal(true);
  };

  const handleDeleteComment = (index: number) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTitle("");
    setType("Deposit");
    setDescription("");
    setStatus("Active");
    setEditIndex(null);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold mb-2">Comments</h2>
          <p className="text-sm text-muted-foreground">
            Create reusable comment templates to quickly prefill descriptions for deposits, withdrawals, and KYC actions. Enable only the ones you want to use.
          </p>
        </div>

        {/* Top Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
          <Input
            className="w-full md:w-auto"
            placeholder="Search by Title"
          />
          <select className="bg-background border border-border rounded-md px-3 py-2 w-full md:w-80">
            <option>All Types</option>
            <option>Accounts</option>
            <option>Deposit</option>
            <option>Withdraw Funds</option>
            <option>Withdraw Account</option>
            <option>KYC</option>
          </select>

          <div className="flex flex-col sm:flex-row gap-3 md:ml-auto w-full md:w-auto">
            <Button variant="outline">
              <ListFilter size={16} /> Filter
            </Button>
            <Button onClick={() => setOpenAddModal(true)}>
              + Add New
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/60 text-sm">
                <tr>
                  <th className="px-3 py-4">TITLE</th>
                  <th className="px-3 py-4">TYPE</th>
                  <th className="px-3 py-4">DESCRIPTION</th>
                  <th className="px-3 py-4">STATUS</th>
                  <th className="px-3 py-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment, index) => (
                  <tr
                    key={index}
                    className="border-t border-border hover:bg-muted/30 text-muted-foreground"
                  >
                    <td className="p-3">{comment.title}</td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={`${typeClasses[comment.type]} rounded-md px-2 py-0.5`}
                      >
                        {comment.type}
                      </Badge>
                    </td>
                    <td className="p-3 max-w-md truncate">{comment.description}</td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={`${statusClasses[comment.status]} rounded-md px-2 py-0.5`}
                      >
                        {comment.status}
                      </Badge>
                    </td>
                    <td className="p-3 flex flex-wrap gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleOpenEditModal(index)}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteComment(index)}
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

        {/* Add Comment Modal */}
        {openAddModal && (
          <CommentModal
            title="Add Comment"
            subtitle="Create a new comment entry"
            onClose={() => {
              setOpenAddModal(false);
              resetForm();
            }}
            onSubmit={handleAddComment}
            commentTitle={title}
            setCommentTitle={setTitle}
            type={type}
            setType={setType}
            description={description}
            setDescription={setDescription}
            status={status}
            setStatus={setStatus}
          />
        )}

        {/* Edit Comment Modal */}
        {openEditModal && (
          <CommentModal
            title="Edit Comment"
            subtitle="Update comment entry"
            onClose={() => {
              setOpenEditModal(false);
              resetForm();
            }}
            onSubmit={handleEditComment}
            commentTitle={title}
            setCommentTitle={setTitle}
            type={type}
            setType={setType}
            description={description}
            setDescription={setDescription}
            status={status}
            setStatus={setStatus}
          />
        )}
      </div>
    </TooltipProvider>
  );
}

/* ------------------ Comment Modal ------------------ */
function CommentModal({
  title,
  subtitle,
  onClose,
  onSubmit,
  commentTitle,
  setCommentTitle,
  type,
  setType,
  description,
  setDescription,
  status,
  setStatus,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  onSubmit: () => void;
  commentTitle: string;
  setCommentTitle: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  status: "Active" | "Disabled";
  setStatus: (v: "Active" | "Disabled") => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-2xl rounded-xl bg-card border border-border p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        {/* Form */}
        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Title"
              placeholder="Enter title"
              value={commentTitle}
              onChange={(e) => setCommentTitle(e.target.value)}
              tooltip="A short label to identify this comment template"
              
            />

            <SelectField
              label="Type"
              tooltip="Where this comment will be available (e.g., Withdraw Amount, KYC)"
              value={type}
              onChange={setType}
              options={[
                { label: "Deposit", value: "Deposit" },
                { label: "Withdraw Funds", value: "Withdraw Funds" },
                { label: "Withdraw Account", value: "Withdraw Account" },
                { label: "KYC", value: "KYC" },
                { label: "Accounts", value: "Accounts" },
              ]}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              Description
              <InputField
                label=""
                tooltip="The text inserted when this title is selected in a modal"
                className="hidden"
              />
            </label>
            <Textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">
              This text will be inserted automatically when the title is selected in supported modals. You can still edit it before submitting.
            </p>
          </div>

          <div className="border border-border rounded-lg px-4 py-3">
            <StatusToggle
              label="Status"
              tooltip="Enable to use this comment; disable to hide it"
              status={status}
              onChange={setStatus}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="destructive" onClick={onClose}>
           Cancel
          </Button>
          <Button onClick={onSubmit}>
            {title === "Add Comment" ? "Create" : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}
