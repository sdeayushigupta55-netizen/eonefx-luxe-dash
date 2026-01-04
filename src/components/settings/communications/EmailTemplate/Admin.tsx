import { useState } from "react";
import { Mail, Pencil, ChevronLeft, ChevronRight, TriangleAlert, Code, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/InputField";
import RichTextEditor from "@/components/form/RichTextEditor";
import { StatusToggle } from "@/components/form/Status";

interface EmailTemplate {
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
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Modal State
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

    // Form State
    const [emailType, setEmailType] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [messageBody, setMessageBody] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [buttonLink, setButtonLink] = useState("");
    const [secondaryMessageEnabled, setSecondaryMessageEnabled] = useState(false);
    const [secondaryMessageBody, setSecondaryMessageBody] = useState("");
    const [templateStatus, setTemplateStatus] = useState<"Active" | "Disabled">("Active");
    const [disclaimer, setDisclaimer] = useState<"Active" | "Disabled">("Disabled");
    const [riskWarning, setRiskWarning] = useState<"Active" | "Disabled">("Disabled");
    const [templateMode, setTemplateMode] = useState<"dynamic" | "custom">("dynamic");
    const [openTestHandle, setOpenTestHandle] = useState(false);
    const [testEmail, setTestEmail] = useState("");

    const emailTemplates: EmailTemplate[] = [
        {
            id: 1,
            title: "Admin Forget Password",
            category: "Admin",
            status: "deactivated",
        },
        {
            id: 2,
            title: "Admin Notification - New Staff Created",
            category: "Admin",
            status: "active",
        },
        {
            id: 3,
            title: "Admin Notification - New User Created (System)",
            category: "Admin",
            status: "active",
        },
        {
            id: 4,
            title: "Admin Notification - New User Registered (Direct)",
            category: "Admin",
            status: "active",
        },
        {
            id: 5,
            title: "Admin Two-Factor Authentication",
            category: "Admin",
            status: "active",
        },
        {
            id: 6,
            title: "Auto Deposit Success - Admin & Staff",
            category: "Admin",
            status: "active",
        },
        {
            id: 7,
            title: "Auto Withdrawal Success - Admin & Staff",
            category: "Admin",
            status: "active",
        },
        {
            id: 8,
            title: "Balance Added By Admin - Admin & Staff",
            category: "Admin",
            status: "active",
        },
        {
            id: 9,
            title: "Balance Subtracted By Admin - Admin & Staff",
            category: "Admin",
            status: "active",
        },
        {
            id: 10,
            title: "Contact Mail Send",
            category: "Admin",
            status: "deactivated",
        },
    ];

    // Pagination Calculations
    const totalItems = emailTemplates.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const paginatedData = emailTemplates.slice(startIndex, endIndex);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((p) => p + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((p) => p - 1);
    };

    const handleEditClick = (template: EmailTemplate) => {
        setSelectedTemplate(template);
        setEmailType(template.title);
        setEmailSubject(template.title);
        setMessageBody("Please click the button below to reset your password.");
        setButtonLabel("Password Reset");
        setButtonLink("[[token]]");
        setSecondaryMessageBody("[[full_name]][[token]]");
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

    const onTestHandle = () => {
        setOpenTestHandle(true);
    };

    const handleCloseTestModal = () => {
        setOpenTestHandle(false);
        setTestEmail("");
    };

    const handleSendTestEmail = () => {
        // Send test email logic here
        console.log("Sending test email to:", testEmail);
        setOpenTestHandle(false);
    };

    return (
        <div className="space-y-4">
            {/* Email Template Table */}
            <Card>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/60 text-sm">
                            <tr>
                                <th className="px-3 py-4">EMAIL FOR</th>
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

            {/* Edit Template Modal */}
            {openEditModal && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
                    <div className="w-full max-w-[95vw] h-[95vh] bg-card rounded-lg shadow-card overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0">
                            <h2 className="text-lg sm:text-xl font-semibold">Edit {selectedTemplate?.title} Template</h2>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" onClick={onTestHandle}>Test Template</Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={handleCloseModal}
                                >
                                    <X size={18} />
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Left Sidebar - Shortcut Glossary */}
                                <div className="w-full lg:w-80 flex-shrink-0">
                                    <div className="bg-muted/30 rounded-lg p-4 sticky top-0">
                                        <h1 className="text-xl font-semibold mb-3">Shortcut Glossary</h1>
                                        <p className="text-xs text-muted-foreground mb-4 flex items-center gap-2">
                                            <TriangleAlert size={16} />
                                            The Shortcuts you can use [[token]], [[site_title]], [[site_url]]
                                        </p>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="text-xs font-medium min-w-[100px]">Token:</div>
                                                <div className="flex-1 bg-background rounded px-2 py-1 text-xs font-mono border border-border flex items-center justify-between">
                                                    [[token]]
                                                    <button
                                                        className="ml-2 text-muted-foreground hover:text-foreground"
                                                        onClick={() => navigator.clipboard.writeText("[[token]]")}
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <div className="text-xs font-medium min-w-[100px]">Site Title:</div>
                                                <div className="flex-1 bg-background rounded px-2 py-1 text-xs font-mono border border-border flex items-center justify-between">
                                                    [[site_title]]
                                                    <button
                                                        className="ml-2 text-muted-foreground hover:text-foreground"
                                                        onClick={() => navigator.clipboard.writeText("[[site_title]]")}
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <div className="text-xs font-medium min-w-[100px]">Site Url:</div>
                                                <div className="flex-1 bg-background rounded px-2 py-1 text-xs font-mono border border-border flex items-center justify-between">
                                                    [[site_url]]
                                                    <button
                                                        className="ml-2 text-muted-foreground hover:text-foreground"
                                                        onClick={() => navigator.clipboard.writeText("[[site_url]]")}
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Content */}
                                <div className="flex-1 space-y-6 bg-muted/30 rounded-lg p-4 sticky top-0">
                                    {/* Template Mode Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h1 className="text-xl font-semibold flex items-center gap-2 mb-2">
                                                <Code size={20} />
                                                Template Mode
                                            </h1>
                                            <p className="text-xs text-muted-foreground">
                                                Choose between dynamic template builder or custom HTML
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setTemplateMode("dynamic")}
                                                className={`px-4 py-2 rounded-md border transition-colors ${templateMode === "dynamic"
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-background border-border hover:bg-muted"
                                                    }`}
                                            >
                                                Dynamic Template
                                            </button>
                                            <button
                                                onClick={() => setTemplateMode("custom")}
                                                className={`px-4 py-2 rounded-md border transition-colors ${templateMode === "custom"
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-background border-border hover:bg-muted"
                                                    }`}
                                            >
                                                Custom HTML
                                            </button>
                                        </div>
                                    </div>

                                    {/* Dynamic Template Section */}
                                    {templateMode === "dynamic" && (
                                        <>
                                            {/* Email Type */}
                                            <InputField
                                                label="Email Type"
                                                tooltip="Leave it blank if you don't need the title"
                                                value={emailType}
                                                onChange={(e) => setEmailType(e.target.value)}

                                            />

                                            {/* Email Subject */}
                                            <InputField
                                                label="Email Subject"
                                                tooltip="Here the Email Subject will come"
                                                value={emailSubject}
                                                onChange={(e) => setEmailSubject(e.target.value)}

                                            />

                                            {/* Message Body */}
                                            <RichTextEditor
                                                label="Message Body"
                                                tooltip="Write the main Messages here"
                                                value={messageBody}
                                                onChange={setMessageBody}
                                            />

                                            {/* Button */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField
                                                    label="Button Label"
                                                    tooltip="Leave it blank if you don't need the button"
                                                    value={buttonLabel}
                                                    onChange={(e) => setButtonLabel(e.target.value)}
                                                />
                                                <InputField
                                                    label="Button Link"
                                                    tooltip="Link for the button"
                                                    value={buttonLink}
                                                    onChange={(e) => setButtonLink(e.target.value)}
                                                />
                                            </div>

                                            {/* Secondary Message Body */}
                                            <div className="space-y-4">
                                                <StatusToggle
                                                    label="Secondary Message Body"
                                                    tooltip="Toggle to enable secondary message"
                                                    status={secondaryMessageEnabled ? "Active" : "Disabled"}
                                                    onChange={(s) => setSecondaryMessageEnabled(s === "Active")}
                                                />

                                                <RichTextEditor
                                                    label=""
                                                    value={secondaryMessageBody}
                                                    onChange={setSecondaryMessageBody}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* Custom HTML Section */}
                                    {templateMode === "custom" && (
                                        <div className="space-y-4">
                                            {/* Email Type */}
                                            <InputField
                                                label="Email Type"
                                                tooltip="Leave it blank if you don't need the title"
                                                value={emailType}
                                                onChange={(e) => setEmailType(e.target.value)}

                                            />

                                            {/* Email Subject */}
                                            <InputField
                                                label="Email Subject"
                                                tooltip="Here the Email Subject will come"
                                                value={emailSubject}
                                                onChange={(e) => setEmailSubject(e.target.value)}

                                            />
                                            <div>
                                                <label className="text-sm font-medium mb-2 block">Custom HTML</label>
                                                <textarea
                                                    className="w-full min-h-[300px] p-4 rounded-md border border-border bg-background font-mono text-sm"
                                                    placeholder="Enter your custom HTML code here..."
                                                    value={messageBody}
                                                    onChange={(e) => setMessageBody(e.target.value)}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium mb-2">Example template for the HTML email template</p>
                                                <div className="bg-muted rounded-md p-4 overflow-x-auto">
                                                    <pre className="text-xs text-muted-foreground">
                                                        {`<!DOCTYPE html>
<html>
  <head>
    <title>[[site_title]]</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; }
      .header { background: #4F46E5; color: white; padding: 20px; }
      .content { padding: 20px; background: #f9f9f9; }
      .button { background: #10B981; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 6px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Hello [[user_name]]!</h1>
      </div>
      <div class="content">
        <p>[[message]]</p>
        <a href="[[action_url]]" class="button">Take Action</a>
      </div>
    </div>
  </body>
</html>`}
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Status Toggles */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
                                        <StatusToggle
                                            label="Template Status"
                                            tooltip="Toggle to activate or deactivate this template"
                                            status={templateStatus}
                                            onChange={setTemplateStatus}
                                        />

                                        <StatusToggle
                                            label="Disclaimer"
                                            tooltip="Enable to append a disclaimer message to the email"
                                            status={disclaimer}
                                            onChange={setDisclaimer}
                                        />

                                        <StatusToggle
                                            label="Risk Warning"
                                            tooltip="Enable to append a risk-related note to the email footer"
                                            status={riskWarning}
                                            onChange={setRiskWarning}
                                        />
                                    </div>

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
                </div>
            )}
            {openTestHandle && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
                    <div className="w-full max-w-md bg-card rounded-lg shadow-card overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0">
                            <h2 className="text-lg sm:text-xl font-semibold">Test Email Template</h2>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={handleCloseTestModal}
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4">
                            <InputField
                                label="Recipient Email"
                                tooltip="Enter the email address to send the test email to"
                                value={testEmail}
                                onChange={(e) => setTestEmail(e.target.value)}
                                placeholder="example@email.com"
                            />

                            <div className="flex justify-end gap-2 pt-2">
                                <Button variant="destructive" onClick={handleCloseTestModal}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSendTestEmail}>
                                    Send Test Email
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
