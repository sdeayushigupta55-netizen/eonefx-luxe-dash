import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomersTabs, customerTabs, getTabTitle } from "./CustomersTabs";
import { CustomersTable } from "./CustomersTable";
import { mockCustomers } from "./customersData";

export default function AllCustomers() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveTab = () => {
    const tab = customerTabs.find(t => t.path === location.pathname);
    return tab?.id || "all";
  };
  
  const activeTab = getActiveTab();
  const customers = mockCustomers[activeTab as keyof typeof mockCustomers] || [];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">{getTabTitle(activeTab)}</h1>
          <Button onClick={() => navigate("/customers/add")} className="bg-card hover:bg-muted text-foreground border border-border">
            <Plus className="h-4 w-4 mr-2" />Add Customer
          </Button>
        </div>

        <CustomersTabs activeTab={activeTab} />
        <CustomersTable customers={customers} />
      </div>
    </DashboardLayout>
  );
}
