export interface KYCRecord {
  id: string;
  date: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  type: "Passport" | "ID Card" | "Driver License";
  status: "Pending" | "Verified" | "Rejected";
}

export const mockPendingKYC: KYCRecord[] = [];

export const mockRejectedKYC: KYCRecord[] = [
  {
    id: "1",
    date: "Sep 18, 2025 03:14",
    userName: "Dave Testerman",
    userEmail: "cimavax@gmail.com",
    type: "Passport",
    status: "Rejected",
  },
];

export const mockAllKYCLogs: KYCRecord[] = [
  {
    id: "1",
    date: "Sep 23, 2025 11:11",
    userName: "Racheal R",
    userEmail: "rachealjameel@gmail.com",
    type: "Passport",
    status: "Verified",
  },
  {
    id: "2",
    date: "Aug 23, 2025 11:11",
    userName: "User Brokeret",
    userEmail: "user@brokeret.com",
    type: "ID Card",
    status: "Verified",
  },
  {
    id: "3",
    date: "Dec 04, 2025 12:17",
    userName: "Test New",
    userEmail: "richirj43743@gmail.com",
    type: "Passport",
    status: "Verified",
  },
  {
    id: "4",
    date: "Nov 20, 2025 11:20",
    userName: "Naeem Ali",
    userEmail: "naeemali2020@gmail.com",
    type: "Passport",
    status: "Verified",
  },
  {
    id: "5",
    date: "Sep 18, 2025 03:14",
    userName: "Dave Testerman",
    userEmail: "cimavax@gmail.com",
    type: "Passport",
    status: "Rejected",
  },
  {
    id: "6",
    date: "May 21, 2025 06:03",
    userName: "Sufyan-2 Sufyan-2",
    userEmail: "sufyan2@gmail.com",
    type: "Passport",
    status: "Verified",
  },
  {
    id: "7",
    date: "May 28, 2025 11:35",
    userName: "Sufyan-3 Sufyan-3",
    userEmail: "sufyan3@brokeret.com",
    type: "Passport",
    status: "Verified",
  },
  {
    id: "8",
    date: "Jul 05, 2025 11:48",
    userName: "Mikhail Prescott",
    userEmail: "prescottmikhail@gmail.com",
    type: "ID Card",
    status: "Verified",
  },
];

export const kycTabs = [
  { id: "logs", label: "All KYC Logs", path: "/compliance/logs" },
  { id: "pending", label: "Level 2 Pending KYC", path: "/compliance/pending" },
  { id: "rejected", label: "Rejected KYC", path: "/compliance/rejected" },
];

export const getTabTitle = (tabId: string): string => {
  const titles: Record<string, string> = {
    logs: "All KYC",
    pending: "Pending KYC",
    rejected: "Rejected KYC",
  };
  return titles[tabId] || "KYC";
};
