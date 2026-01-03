import { InputField } from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SelectField } from "@/components/form/SelectField";
import { StatusToggle } from "@/components/form/Status";
import { useState } from "react";



export default function ForexDailyReporting() {
    const [isActive, setIsActive] = useState(true);
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold">Forex Daily Reporting</h2>
            </div>

            {/* Enable Daily Account Statements Card */}
            <Card className="p-6 bg-card">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Enable Daily Account Statements</h3>
                        <p className="text-sm text-muted-foreground">
                            Enable or disable the daily account statements
                        </p>
                    </div>
                    <Switch defaultChecked />
                </div>
            </Card>

            {/* Form Card */}
            <Card className="p-6 bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Statement Sending Time */}
                    <InputField
                        label="Statement Sending Time"
                        tooltip="The time of day to send the daily account statements"
                        type="time"
                        defaultValue="07:32"
                    />

                    {/* Timezone */}
                    <SelectField
                        label="Timezone"
                        tooltip="The timezone to use for the daily account statements"

                        options={[
                            { value: "UTC", label: "UTC (Coordinated Universal Time)" },
                            { value: "Asia/Tokyo", label: "Asia/Tokyo (Japan Standard Time)" },
                            { value: "Asia/Shanghai", label: "Asia/Shanghai (China Standard Time)" },
                            { value: "Asia/Hong_Kong", label: "Asia/Hong_Kong (Hong Kong Time)" },
                            { value: "Asia/Singapore", label: "Asia/Singapore (Singapore Time)" },
                            { value: "Asia/Dubai", label: "Asia/Dubai (Gulf Standard Time)" },
                            { value: "Australia/Sydney", label: "Australia/Sydney (Australian Eastern Time)" },
                            { value: "Europe/London", label: "Europe/London (Greenwich Mean Time)" },
                            { value: "Europe/Frankfurt", label: "Europe/Frankfurt (Central European Time)" },
                            { value: "Europe/Paris", label: "Europe/Paris (Central European Time)" },
                            { value: "Europe/Zurich", label: "Europe/Zurich (Central European Time)" },
                            { value: "America/New_York", label: "America/New_York (Eastern Time)" },
                            { value: "America/Chicago", label: "America/Chicago (Central Time)" },
                            { value: "America/Los_Angeles", label: "America/Los_Angeles (Pacific Time)" },
                            { value: "Pacific/Auckland", label: "Pacific/Auckland (New Zealand Time)" },
                        ]}
                    />

                    {/* Account Types */}
                    <SelectField
                        label="Account Types"
                        tooltip="The account types to include in the daily account statements"

                        options={[
                            { value: "both", label: "Both" },
                            { value: "real", label: "Real" },
                            { value: "demo", label: "Demo" },
                        ]}
                    />

                    {/* Batch Size */}
                    <InputField
                        label="Batch Size"
                        tooltip="Number of accounts to process in each batch"
                        type="number"
                        defaultValue="50"
                    />

                    {/* Retry Attempts */}
                    <InputField
                        label="Retry Attempts"
                        tooltip="The number of retry attempts for failed sends"
                        type="number"
                        defaultValue="3"
                    />

                    {/* Statement Period */}
                    <SelectField
                        label="Statement Period"
                        tooltip="The period for which the statement is generated"

                        options={[
                            { value: "previous_day", label: "Previous Day" },
                            { value: "current_day", label: "Current Day" },
                        ]}
                    />

                    {/* Include PDF Attachment */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">

                            <StatusToggle
                                label="Include PDF Attachment"
                                tooltip="Include the PDF attachment in the daily account statements"
                                status={isActive ? "Active" : "Disabled"}
                                onChange={(s) => setIsActive(s === "Active")}
                            />
                        </div>
                    </div>

                    {/* Retry Failed Sends */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <StatusToggle
                                label="Retry Failed Sends"
                                tooltip="Retry the failed sends for the daily account statements"
                                status={isActive ? "Active" : "Disabled"}
                                onChange={(s) => setIsActive(s === "Active")}
                            />


                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-6">
                    <Button className="w-auto">
                        Save Changes
                    </Button>
                </div>
            </Card>
        </div>
    );
}