import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ActivityLogsTabs } from "./ActivityLogsTabs";
import { ActivityLogsTable } from "./ActivityLogsTable";
import { userActivitiesData } from "./activityLogsData";

export function UserActivities() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">User Activities</h1>
        
        <ActivityLogsTabs />
        
        <ActivityLogsTable 
          data={userActivitiesData} 
          showActorType={false}
          userLabel="USER"
        />
      </div>
    </DashboardLayout>
  );
}
