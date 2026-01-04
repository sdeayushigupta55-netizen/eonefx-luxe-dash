import { useState } from "react";
import { Mail, Pencil, ChevronLeft, ChevronRight, RotateCcw, CreditCard, DollarSign, AlertTriangle, CheckCircle, Shield, FileText, Database, HandCoins, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/form/RichTextEditor";
import { StatusToggle } from "@/components/form/Status";
import { InputField } from "@/components/form/InputField";

interface NotificationTemplate {
    id: number;
    title: string;
    category: string;
    status: "active" | "deactivated";
    icon: any;
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
    const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);

    // Form State
    const [notificationTitle, setNotificationTitle] = useState("");
    const [messageBody, setMessageBody] = useState("");
    const [templateStatus, setTemplateStatus] = useState<"Active" | "Disabled">("Active");

    const notificationTemplates: NotificationTemplate[] = [
        {
            id: 1,
            title: "Auto Deposit Success - Admin & Staff",
            category: "Admin",
            status: "active",
            icon: CreditCard,
        },
        {
            id: 2,
            title: "Auto Withdrawal Success - Admin & Staff",
            category: "Admin",
            status: "active",
            icon: DollarSign,
        },
        {
            id: 3,
            title: "SMTP Failure Detected",
            category: "Admin",
            status: "active",
            icon: Mail,
        },
        {
            id: 4,
            title: "SMTP Multiple Failures",
            category: "Admin",
            status: "active",
            icon: AlertTriangle,
        },
        {
            id: 5,
            title: "SMTP Service Recovered",
            category: "Admin",
            status: "active",
            icon: CheckCircle,
        },
        {
            id: 6,
            title: "IB Request",
            category: "Admin",
            status: "active",
            icon: Shield,
        },
        {
            id: 7,
            title: "Payment Deposit Request",
            category: "Admin",
            status: "active",
            icon: FileText,
        },
        {
            id: 8,
            title: "Withdraw Account Request",
            category: "Admin",
            status: "active",
            icon: Database,
        },
        {
            id: 9,
            title: "KYC Request",
            category: "Admin",
            status: "active",
            icon: Shield,
        },
        {
            id: 10,
            title: "Manual Deposit Request",
            category: "Admin",
            status: "active",
            icon: HandCoins,
        },
    ];

    const totalItems = notificationTemplates.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const paginatedData = notificationTemplates.slice(startIndex, endIndex);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((p) => p + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((p) => p - 1);
    };

    const handleEditClick = (template: NotificationTemplate) => {
        setSelectedTemplate(template);
        setNotificationTitle(template.title);
        setMessageBody("Your deposit has been successfully processed.");
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
            {/* Notification Template Table */}
            <Card>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/60 text-sm">
                            <tr>
                                <th className="px-3 py-4">NOTIFICATION FOR</th>
                                <th className="px-3 py-4">STATUS</th>
                                <th className="px-3 py-4">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((template) => {
                                const IconComponent = template.icon;
                                return (
                                    <tr
                                        key={template.id}
                                        className="border-t border-border hover:bg-muted/30 text-muted-foreground"
                                    >
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                                    <IconComponent className="w-5 h-5 text-muted-foreground" />
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
                                                {template.status === "active" ? "Active" : "Deactivated"}
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
                                );
                            })}
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

            {/* Edit Notification Template Modal */}
            {openEditModal && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
                    <div className="w-full max-w-4xl bg-card rounded-lg shadow-card overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0 bg-muted/30">
                            <h2 className="text-lg sm:text-xl font-semibold">Edit {selectedTemplate?.title} Templates</h2>
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
                                {/* Notification Title */}
                                <InputField
                                    label="Notification Title"
                                    tooltip="Enter the notification title"
                                    value={notificationTitle}
                                    onChange={(e) => setNotificationTitle(e.target.value)}
                                    placeholder="Notification title"
                                />

                                {/* Message Body */}
                                <RichTextEditor
                                    label="Message Body"
                                    tooltip="Write the notification message here"
                                    value={messageBody}
                                    onChange={setMessageBody}
                                />

                                <p className="text-xs text-muted-foreground">
                                    The Shortcuts you can use <span className="font-mono">[[full_name]], [[amount]], [[method]], [[site_title]]</span>
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
