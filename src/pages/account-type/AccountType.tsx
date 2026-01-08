import { Routes, Route, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AccountTypeTabs } from "./AccountTypeTabs";
import { AccountTypeTable } from "./AccountTypeTable";
import { IBAccountTypeTable } from "./IBAccountTypeTable";
import { AccountTypeSettings } from "./AccountTypeSettings";
import AddAccountType from "./AddAccountType";
import { IBAccountTypeView } from "./IBAccountTypeView";

export default function AccountType() {
  const location = useLocation();
  const isAddPage = location.pathname.includes("/account-type/add");
  const isIBViewPage = location.pathname.includes("/account-type/ib-account-type/view");

  if (isAddPage) {
    return <AddAccountType />;
  }

  if (isIBViewPage) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <IBAccountTypeView />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <AccountTypeTabs />
        <Routes>
          <Route index element={<AccountTypeTable />} />
          <Route path="ib-account-type" element={<IBAccountTypeTable />} />
          <Route path="settings" element={<AccountTypeSettings />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
}
