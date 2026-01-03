import { useState } from "react";
import { InputField } from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function CollabTools() {
    const [activeTab, setActiveTab] = useState("slack");

    const tabs = [
        { id: "slack", label: "Slack Settings" },
      
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold">Slack Settings</h2>
            </div>

            {/* Tabs */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === tab.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {/* Slack Settings */}
            {activeTab === "slack" && (
                <Card className="p-6 bg-card">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Web Hook Url"
                            tooltip="Enter your Slack webhook URL to receive notifications"
                            placeholder="https://hooks.slack.com/services/..."
                        />

                        <InputField
                            label="Chanel Name (Optional)"
                            tooltip="Specify the Slack channel name where notifications will be sent"
                            placeholder="#general"
                        />
                    </div>

                    <div className="mt-6">
                        <Button className="w-auto">
                            
                            Save Changes
                        </Button>
                    </div>
                </Card>
            )}

        </div>
    );
}