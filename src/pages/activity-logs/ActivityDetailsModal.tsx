import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActivityLog } from "./activityLogsData";

interface ActivityDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: ActivityLog | null;
}

export function ActivityDetailsModal({
  open,
  onOpenChange,
  activity,
}: ActivityDetailsModalProps) {
  if (!activity) return null;

  // Generate mock additional data based on activity
  const getDescription = (activityType: string) => {
    switch (activityType) {
      case "Admin Login":
      case "User Login":
        return "Login Successfully";
      case "User Logout":
        return "Logout Successfully";
      case "Deposit":
        return "Deposit Request Processed";
      case "Ticket Create":
        return "Support Ticket Created";
      case "Ticket Close":
        return "Support Ticket Closed";
      case "Forex Account Create":
        return "Trading Account Created";
      case "Withdraw Account Created":
        return "Withdraw Account Added";
      case "Theme Update":
        return "Theme Settings Updated";
      default:
        return "Action Completed Successfully";
    }
  };

  const generateIP = () => {
    return `154.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Activity Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Activity Information */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
              Activity Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Activity:</span>
                <span className="text-foreground font-medium">{activity.activity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Description:</span>
                <span className="text-foreground">{getDescription(activity.activity)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Time:</span>
                <span className="text-foreground">{activity.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">IP:</span>
                <span className="text-foreground">{generateIP()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Location:</span>
                <span className="text-foreground">{activity.location}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">Agent:</span>
                <span className="text-foreground text-right max-w-[300px] text-sm">
                  {userAgent}
                </span>
              </div>
            </div>
          </div>

          {/* Meta Information */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
              Meta Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  {activity.actorType === "Admin" ? "Admin Name" : "User Name"}
                </span>
                <span className="text-foreground font-medium">{activity.user.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  {activity.actorType === "Admin" ? "Admin Email" : "User Email"}
                </span>
                <span className="text-foreground">{activity.user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
