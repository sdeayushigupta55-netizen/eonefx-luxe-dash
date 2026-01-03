import { useState, useEffect } from "react";
import DepositMethods from "./DepositMethods/Depositmethodsindex"
import WithdrawMethods from "./WithdrawMethods/WithdrawMethodsindex";
import Currency from "./Currency";
import Transfers from "./Transfers";
import Bonuses from "./Bonuses";

interface PaymentSettingsProps {
    defaultTab?: string;
}

export default function PaymentSettings({
    defaultTab = "depositmethods",
}: PaymentSettingsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setActiveTab(defaultTab);
    }, [defaultTab]);

    /* ✅ PAYMENT SIDEBAR TABS */
    const sidetabs = [
        { key: "depositmethods", label: "Deposit Methods" },
        { key: "withdrawmethods", label: "Withdraw Methods" },
        { key: "bonuses", label: "Bonuses" },
        { key: "currency", label: "Currency" },
        { key: "transfers", label: "Transfers" },
    ];

    // Filter tabs by search term
    const filteredTabs = sidetabs.filter((tab) =>
        tab.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-full w-full">
            {/* LEFT SIDEBAR - Stack on mobile, side-by-side on desktop */}
            <div className="w-full lg:w-64 flex-shrink-0 rounded-md border border-border p-4 bg-card shadow-card">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full mb-3 px-3 py-2 rounded-md border border-border bg-background text-sm
                     placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="flex flex-col gap-2">
                    {filteredTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                                activeTab === tab.key
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT CONTENT - Full width on mobile, flex-1 on desktop */}
            <div className="flex-1 min-w-0">
                <div className="border border-border rounded-md p-4 sm:p-6 bg-card shadow-card">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}