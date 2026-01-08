import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ActivityLogsTabs } from "./ActivityLogsTabs";
import { ActivityLogsTable } from "./ActivityLogsTable";
import { allActivitiesData } from "./activityLogsData";

export function AllActivities() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">All Activities</h1>
        
        <ActivityLogsTabs />
        
        <ActivityLogsTable data={allActivitiesData} showActorType={true} />
      </div>
    </DashboardLayout>
  );
}
