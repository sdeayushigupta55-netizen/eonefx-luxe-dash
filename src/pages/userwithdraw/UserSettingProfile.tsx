import { VerifyBanner } from "@/components/userdashboard/VerifyBanner";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import WithdrawalAccounts from "./WithdrawalAccounts";
import UserKYC from "./UserKYC";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const UserSettingProfile = () => {
  const [activeTab, setActiveTab] = useState("Withdrawal Accounts");
  const location = useLocation();

  const tabs = [
    "Profile",
    "Withdrawal Accounts",
    "Security",
    "KYC",
    "Preferences",
    "Agreements",
    "Notifications",
    "Tools",
  ];

  useEffect(() => {
    if (location.pathname === "/user/userkyc") {
      setActiveTab("KYC");
    }
  }, [location.pathname]);

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

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "Withdrawal Accounts" && <WithdrawalAccounts />}
          {activeTab === "Profile" && <div>Profile Content</div>}
          {activeTab === "Security" && <div>Security Content</div>}
          {activeTab === "KYC" && <UserKYC />}
          {activeTab === "Preferences" && <div>Preferences Content</div>}
          {activeTab === "Agreements" && <div>Agreements Content</div>}
          {activeTab === "Notifications" && <div>Notifications Content</div>}
          {activeTab === "Tools" && <div>Tools Content</div>}
          {/* Add other tab content here */}
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default UserSettingProfile;
