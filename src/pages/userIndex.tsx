// import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import UserDashboard from "./UserDashboard";

const userIndex = () => {
  return (
    <UserDashboardLayout>
      <UserDashboard />
    </UserDashboardLayout>
  );
};

export default userIndex;
