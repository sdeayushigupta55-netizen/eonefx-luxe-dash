import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KYCTabs } from "./KYCTabs";
import { KYCTable } from "./KYCTable";
import { mockAllKYCLogs, kycTabs, getTabTitle } from "./complianceData";

export default function AllKYCLogs() {
  const location = useLocation();

  const getActiveTab = () => {
    const tab = kycTabs.find((t) => t.path === location.pathname);
    return tab?.id || "logs";
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
        <KYCTable records={mockAllKYCLogs} modalVariant="single" />
      </div>
    </DashboardLayout>
  );
}
