import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ActivityLogsTabs } from "./ActivityLogsTabs";
import { ActivityLogsTable } from "./ActivityLogsTable";
import { staffActivitiesData } from "./activityLogsData";

export function StaffActivities() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Staff Activities</h1>
        
        <ActivityLogsTabs />
        
        <ActivityLogsTable 
          data={staffActivitiesData} 
          showActorType={false}
          userLabel="STAFF MEMBER"
        />
      </div>
    </DashboardLayout>
  );
}
