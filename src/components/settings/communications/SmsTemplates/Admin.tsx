import { useState } from "react";
import { Mail, Pencil, ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/form/RichTextEditor";
import { StatusToggle } from "@/components/form/Status";

interface SmsTemplate {
    id: number;
    title: string;
    category: string;
    status: "active" | "deactivated";
}

const statusClasses: Record<string, string> = {
    Activated: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Deactivated: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};

export default function Admin() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Modal State
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<SmsTemplate | null>(null);

    // Form State
    const [messageBody, setMessageBody] = useState("");
    const [templateStatus, setTemplateStatus] = useState<"Active" | "Disabled">("Active");

    const smsTemplates: SmsTemplate[] = [
        {
            id: 1,
            title: "New User",
            category: "Admin",
            status: "active",
        },
        {
            id: 2,
            title: "User Account Disabled",
            category: "Admin",
            status: "active",
        },
    ];

    const totalItems = smsTemplates.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const paginatedData = smsTemplates.slice(startIndex, endIndex);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((p) => p + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((p) => p - 1);
    };

    const handleEditClick = (template: SmsTemplate) => {
        setSelectedTemplate(template);
        setMessageBody("Thanks for joining us [[full_name]] [[message]]");
        setTemplateStatus(template.status === "active" ? "Active" : "Disabled");
        setOpenEditModal(true);
    };

    const handleCloseModal = () => {
        setOpenEditModal(false);
        setSelectedTemplate(null);
    };

    const handleSaveChanges = () => {
        // Save logic here
        setOpenEditModal(false);
    };

    return (
        <div className="space-y-4">
            {/* SMS Template Table */}
            <Card>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/60 text-sm">
                            <tr>
                                <th className="px-3 py-4">SMS FOR</th>
                                <th className="px-3 py-4">STATUS</th>
                                <th className="px-3 py-4">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((template) => (
                                <tr
                                    key={template.id}
                                    className="border-t border-border hover:bg-muted/30 text-muted-foreground"
                                >
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">
                                                    {template.title}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {template.category}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <Badge
                                            variant="outline"
                                            className={`${statusClasses[template.status === "active" ? "Activated" : "Deactivated"]
                                                } rounded-md px-2 py-0.5`}
                                        >
                                            {template.status === "active" ? "Activated" : "Deactivated"}
                                        </Badge>
                                    </td>
                                    <td className="p-3">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => handleEditClick(template)}
                                        >
                                            <Pencil size={14} />
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

            {/* Edit SMS Template Modal */}
            {openEditModal && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
                    <div className="w-full max-w-4xl bg-card rounded-lg shadow-card overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0 bg-muted/30">
                            <h2 className="text-lg sm:text-xl font-semibold">Edit {selectedTemplate?.title} Template</h2>
                            <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={handleCloseModal}
                                >
                                    <X size={18} />
                                </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            <div className="space-y-6">
                                {/* Preview */}
                                <div className="bg-muted/30 rounded-lg p-4 border">
                                    <div 
                                        className="text-sm text-muted-foreground"
                                        dangerouslySetInnerHTML={{ __html: messageBody }}
                                    />
                                </div>

                                {/* Message Body */}
                                <RichTextEditor
                                    label="Message Body"
                                    tooltip="Write the SMS message here"
                                    value={messageBody}
                                    onChange={setMessageBody}
                                />

                                <p className="text-xs text-muted-foreground">
                                    The Shortcuts you can use <span className="font-mono">[[full_name]], [[message]]</span>
                                </p>

                                {/* Template Status */}
                                <StatusToggle
                                    label="Template Status"
                                    tooltip="Toggle to activate or deactivate this template"
                                    status={templateStatus}
                                    onChange={setTemplateStatus}
                                />

                                {/* Save Button */}
                                <div className="flex justify-end pt-4">
                                    <Button onClick={handleSaveChanges}>
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
