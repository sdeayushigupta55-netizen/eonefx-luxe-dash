import { useState } from "react";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, List, Check, Trash2, CheckCircle } from "lucide-react";
import Email from "./Email";

interface EmailTemplateIndexProps {
    onNavigateToEmail?: () => void;
}

export default function SMTPMonitoring({ onNavigateToEmail }: EmailTemplateIndexProps) {
    const [openEmailConfig, setOpenEmailConfig] = useState(false);
    const [openLogsModal, setOpenLogsModal] = useState(false);

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold">SMTP Monitoring Settings</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Configure SMTP failure detection and alerting preferences
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={onNavigateToEmail}>
                            <Settings className="w-4 h-4 mr-2" />
                            Configuration
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setOpenLogsModal(true)}>
                            <List className="w-4 h-4 mr-2" />
                            View Logs
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section - Settings */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Enable SMTP Monitoring Card */}
                        <Card className="p-6 bg-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-lg font-semibold mb-1">Enable SMTP Monitoring</h1>
                                    <p className="text-sm text-muted-foreground">
                                        Automatically detect and alert on email sending failures
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </Card>

                        {/* Alert Configuration */}
                        <Card className="p-6 bg-card">
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                <InputField
                                    label="Alert Cooldown Period (Seconds)"
                                    tooltip="Minimum time between push notifications (60-86400 seconds)"
                                    type="number"
                                    defaultValue="1800"
                                    required
                                />

                                <InputField
                                    label="Failure Threshold"
                                    tooltip="Number of failures before sending escalated alert"
                                    type="number"
                                    defaultValue="3"
                                    required
                                />
                            </div>
                        </Card>

                        {/* Enable Scheduled Health Checks Card */}
                        <Card className="p-6 bg-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-lg font-semibold mb-1">Enable Scheduled Health Checks</h1>
                                    <p className="text-sm text-muted-foreground">
                                        Periodically test SMTP connection via cron job
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </Card>

                        {/* Health Check Interval */}
                        <Card className="p-6 bg-card">
                            <SelectField
                                label="Health Check Interval"
                                tooltip="How often to run automated SMTP health checks"
                               
                                options={[
                                    { value: "5", label: "Every 5 minutes" },
                                    { value: "15", label: "Every 15 minutes" },
                                    { value: "30", label: "Every 30 minutes" },
                                    { value: "60", label: "Every hour" },
                                    { value: "240", label: "Every 4 hours" },
                                    { value: "1440", label: "Every 24 hours" },
                                ]}
                            />
                        </Card>

                        {/* Save Button */}
                        <Button className="w-auto">
                            <Check className="w-4 h-4 mr-2" />
                            Save Settings
                        </Button>
                    </div>

                    {/* Right Section - Statistics */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 bg-card">
                            <h3 className="text-xl font-semibold mb-6">Statistic</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-border">
                                    <span className="text-sm text-muted-foreground">ALERT STATUS</span>
                                    <span className="text-sm font-semibold text-green-500">NORMAL</span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-border">
                                    <span className="text-sm text-muted-foreground">Total Failures</span>
                                    <span className="text-sm font-semibold">0</span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-border">
                                    <span className="text-sm text-muted-foreground">Last 24 Hours</span>
                                    <span className="text-sm font-semibold">0</span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-border">
                                    <span className="text-sm text-muted-foreground">Last 7 Days</span>
                                    <span className="text-sm font-semibold">0</span>
                                </div>

                                <div className="flex justify-between items-center py-3">
                                    <span className="text-sm text-muted-foreground">This Month</span>
                                    <span className="text-sm font-semibold">0</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Email Configuration Modal */}
            {openEmailConfig && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
                    <div className="w-full max-w-[95vw] h-[95vh] bg-card rounded-lg shadow-card overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0">
                            <h2 className="text-lg sm:text-xl font-semibold">Email Configuration</h2>
                            <Button 
                                size="icon" 
                                variant="ghost" 
                                onClick={() => setOpenEmailConfig(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            <Email />
                        </div>
                    </div>
                </div>
            )}

            {/* SMTP Failure Logs Modal */}
            {openLogsModal && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
                    <div className="w-full max-w-[95vw] h-[95vh] bg-card rounded-lg shadow-card overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0">
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold">SMTP Failure Logs</h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Monitor and troubleshoot email delivery failures.
                                </p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Button variant="outline" size="sm" onClick={() => setOpenLogsModal(false)}>
                                    <Settings className="w-4 h-4 mr-2" />
                                    Settings
                                </Button>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Clear Logs
                                </Button>
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    onClick={() => setOpenLogsModal(false)}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            {/* Statistics Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <Card className="p-4 bg-card border border-border">
                                    <div className="text-sm text-muted-foreground mb-1">Total Failures</div>
                                    <div className="text-3xl font-bold">0</div>
                                </Card>
                                <Card className="p-4 bg-card border border-border">
                                    <div className="text-sm text-muted-foreground mb-1">Failed</div>
                                    <div className="text-3xl font-bold text-red-500">0</div>
                                </Card>
                                <Card className="p-4 bg-card border border-border">
                                    <div className="text-sm text-muted-foreground mb-1">Resent</div>
                                    <div className="text-3xl font-bold text-green-500">0</div>
                                </Card>
                                <Card className="p-4 bg-card border border-border">
                                    <div className="text-sm text-muted-foreground mb-1">Today</div>
                                    <div className="text-3xl font-bold">0</div>
                                </Card>
                            </div>

                            {/* Empty State */}
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="mb-4">
                                    <CheckCircle className="w-16 h-16 text-green" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No Failures Detected</h3>
                                <p className="text-muted-foreground text-center max-w-md">
                                    Your SMTP service is running smoothly!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}