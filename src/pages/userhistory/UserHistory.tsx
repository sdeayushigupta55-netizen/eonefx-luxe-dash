import { VerifyBanner } from "@/components/userdashboard/VerifyBanner";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import TransactionHistory from "./TransactionHistory";
import React, { useState } from "react";
import AccountHistory from "./AccountHistory";

const UserHistory = () => {
  const [activeTab, setActiveTab] = useState("transaction");

  const tabs = ["transaction", "account"];

  return (
    <UserDashboardLayout>
      <div className="space-y-6">
        <VerifyBanner />

        {/* Tabs */}
       <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === tab
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
         
        </div>

        {/* Content */}
        {activeTab === "transaction" && <TransactionHistory />}

        {activeTab === "account" && <AccountHistory />}
    
      </div>
    </UserDashboardLayout>
  );
};

export default UserHistory;
