
import { VerifyBanner } from "@/components/userdashboard/VerifyBanner";

import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import MyAccount from "./MyAccount";
import { Download } from "lucide-react";
import DownloadPlatform from "./DownloadPlatform";




const MyAccountIndex=() => {
  return (
    <UserDashboardLayout>
      <div className="space-y-6">
       <VerifyBanner />
        <MyAccount />
        <DownloadPlatform />
   </div>
    </UserDashboardLayout>
  );
}
 export default MyAccountIndex;
