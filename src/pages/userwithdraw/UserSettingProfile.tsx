import { VerifyBanner } from "@/components/userdashboard/VerifyBanner";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import WithdrawalAccounts from "./WithdrawalAccounts";
import UserKYC from "./UserKYC";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserTool from "./UserTool";
import UserAgreements from "./UserAgreements";
import UserPrefrence from "./UserPrefrence";
import UserSecurity from "./UserSecurity";
import UserProfile from "./UserProfile";



const UserSettingProfile = () => {
  const [activeTab, setActiveTab] = useState("Withdrawal Accounts");
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = [
    "Profile",
    "Withdrawal Accounts",
    "Security",
    "KYC",
    "Preferences",
    "Agreements",
    "Tools",
  ];

  useEffect(() => {
    if (location.pathname === "/user/userkyc") {
      setActiveTab("KYC");
    }
  }, [location.pathname]);
 // Handler for verification click
  const handleBeginVerification = () => {
    setActiveTab("KYC");
    if (location.pathname !== "/usersettingprofile") {
      navigate("/usersettingprofile");
    }
  };
  return (
    <UserDashboardLayout>
      <div className="space-y-6">
        {/* Show VerifyBanner on all tabs except KYC */}
         {activeTab !== "KYC" && <VerifyBanner onBeginVerification={handleBeginVerification} />}

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
          {activeTab === "Profile" && <UserProfile />}
          {activeTab === "Security" && <UserSecurity />}
          {activeTab === "KYC" && <UserKYC />}
          {activeTab === "Preferences" && <UserPrefrence />}
          {activeTab === "Agreements" && <UserAgreements />}
          {activeTab === "Tools" && <UserTool />}
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default UserSettingProfile;


