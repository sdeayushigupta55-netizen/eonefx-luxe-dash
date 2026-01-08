import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KYCTabs } from "./KYCTabs";
import { KYCTable } from "./KYCTable";
import { mockPendingKYC, kycTabs, getTabTitle } from "./complianceData";

export default function PendingKYC() {
  const location = useLocation();

  const getActiveTab = () => {
    const tab = kycTabs.find((t) => t.path === location.pathname);
    return tab?.id || "pending";
  };

  const activeTab = getActiveTab();

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">
            {getTabTitle(activeTab)}
          </h1>
        </div>

        <KYCTabs activeTab={activeTab} />
        <KYCTable records={mockPendingKYC} modalVariant="single" />
      </div>
    </DashboardLayout>
  );
}
