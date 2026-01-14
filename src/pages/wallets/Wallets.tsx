
import { VerifyBanner } from "@/components/userdashboard/VerifyBanner";
import AccountDetails from "./AccountDetails";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";

import RecentTransactions from "./RecentTransactions";


const Wallets=() => {
  return (
    <UserDashboardLayout>
      <div className="space-y-6">
       <VerifyBanner />
        
        <AccountDetails />
        
        <RecentTransactions />
      </div>
    </UserDashboardLayout>
  );
}
 export default  Wallets ;
