import { useState, useEffect } from "react";

import DepositMethods from "./DepositMethods";
import WithdrawMethods from "./WithdrawMethods";
import Currency from "./Currency";
import Transfers from "./Transfers";
import Bonuses from "./Bonuses";
interface PaymentSettingsProps {
    defaultTab?: string;
}

export default function PaymentSettings({
    defaultTab = "customer",
}: PaymentSettingsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    useEffect(() => {
        setActiveTab(defaultTab);
    }, [defaultTab]);

    /* ✅ USER MANAGEMENT SIDEBAR */
    const sidetabs = [
        { key: "depositmethods", label: "Deposit Methods" },
        { key: "withdrawmethods", label: "Withdraw Methods" },
        { key: "bonuses", label: "Bonuses" },
        { key: "currency", label: "Currency" },
        { key: "transfers", label: "Transfers" },
        
    ];

    /* ✅ CONTENT RENDER */

    const renderContent = () => {
        switch (activeTab) {
            case "depositmethods":
                return <DepositMethods />;

            case "withdrawmethods":

                return <WithdrawMethods />;
                case "bonuses":
                return <Bonuses />;
            case "currency":
                return <Currency />;
            case "transfers":
                return <Transfers />;
            
            default:
                return null;
        }
    };

    return (
        <div className="flex h-full w-full">
            {/* LEFT SIDEBAR */}
            <div className="w-64 border-r border-border p-4 bg-card">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full mb-3 px-3 py-2 rounded-md border border-border bg-background
                     placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {sidetabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`w-full text-left px-3 py-2 rounded-md mb-2 transition ${activeTab === tab.key
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 pl-6">
                <div className="border border-border rounded-md p-4 bg-card">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
